// NOTE: Nested threading with per-comment voting, collapse/expand, and connector lines.
// This is the full Reddit-style comment system; flat comments are not the goal here.

const Comment = require('../models/Comment');
const CommentVote = require('../models/CommentVote');

async function recomputeScore(commentId) {
  const [up, down] = await Promise.all([
    CommentVote.countDocuments({ comment: commentId, type: 'up' }),
    CommentVote.countDocuments({ comment: commentId, type: 'down' }),
  ]);
  return Comment.findByIdAndUpdate(commentId, { upvotes: up, downvotes: down }, { new: true });
}

function buildTree(flat, parentId = null) {
  return flat
    .filter(c => {
      const pid = c.parent ? c.parent.toString() : null;
      return pid === parentId;
    })
    .map(c => ({
      ...c,
      replies: buildTree(flat, c._id.toString()),
    }))
    .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
}

exports.createComment = async (req, res) => {
  try {
    const { text, parentCommentId } = req.body;
    if (!text || !text.trim()) {
      return res.status(400).json({ message: 'Comment cannot be empty.' });
    }
    if (parentCommentId) {
      const parentExists = await Comment.findById(parentCommentId);
      if (!parentExists) {
        return res.status(404).json({ message: 'Parent comment not found.' });
      }
    }
    const comment = await Comment.create({
      note: req.params.id,
      user: req.user._id,
      text,
      parent: parentCommentId || null,
    });
    const populated = await comment.populate('user', 'username');
    res.status(201).json(populated);
  } catch (err) {
    res.status(500).json({ message: 'Could not post comment.' });
  }
};

exports.getCommentsForNote = async (req, res) => {
  try {
    const flat = await Comment.find({ note: req.params.id })
      .populate('user', 'username')
      .lean();
    const tree = buildTree(flat, null);
    res.json(tree);
  } catch (err) {
    res.status(500).json({ message: 'Could not load comments.' });
  }
};

exports.castVote = async (req, res) => {
  try {
    const { type } = req.body;
    const commentId = req.params.commentId;
    const userId = req.user._id;

    const existing = await CommentVote.findOne({ comment: commentId, user: userId });
    if (existing && existing.type === type) {
      await existing.deleteOne();
    } else if (existing) {
      existing.type = type;
      await existing.save();
    } else {
      await CommentVote.create({ comment: commentId, user: userId, type });
    }

    const updated = await recomputeScore(commentId);
    res.json({ upvotes: updated.upvotes, downvotes: updated.downvotes });
  } catch (err) {
    res.status(500).json({ message: 'Could not cast vote.' });
  }
};

exports.getMyVotes = async (req, res) => {
  try {
    const votes = await CommentVote.find({ user: req.user._id });
    const map = {};
    votes.forEach(v => { map[v.comment.toString()] = v.type; });
    res.json(map);
  } catch (err) {
    res.status(500).json({ message: 'Could not load votes.' });
  }
};

exports.updateComment = async (req, res) => {
  try {
    const { text } = req.body;
    if (!text || !text.trim()) {
      return res.status(400).json({ message: 'Comment cannot be empty.' });
    }
    const comment = await Comment.findById(req.params.commentId);
    if (!comment) return res.status(404).json({ message: 'Comment not found.' });
    if (!comment.user || comment.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized.' });
    }
    comment.text = text;
    comment.edited = true;
    await comment.save();
    const populated = await comment.populate('user', 'username');
    res.json(populated);
  } catch (err) {
    res.status(500).json({ message: 'Could not update comment.' });
  }
};

exports.deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.commentId);
    if (!comment) return res.status(404).json({ message: 'Comment not found.' });
    if (!comment.user || comment.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized.' });
    }
    comment.text = '[deleted]';
    comment.user = undefined;
    comment.edited = false;
    await comment.save();
    res.json({ message: 'Comment deleted.' });
  } catch (err) {
    res.status(500).json({ message: 'Could not delete comment.' });
  }
};
