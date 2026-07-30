const Vote = require('../models/Vote');
const Note = require('../models/Note');

async function recomputeCounts(noteId) {
  const [up, down] = await Promise.all([
    Vote.countDocuments({ note: noteId, type: 'up' }),
    Vote.countDocuments({ note: noteId, type: 'down' }),
  ]);
  await Note.findByIdAndUpdate(noteId, { upvotes: up, downvotes: down });
  return { upvotes: up, downvotes: down };
}

exports.castVote = async (req, res) => {
  try {
    const { type } = req.body;
    const noteId = req.params.id;
    const userId = req.user._id;

    const existing = await Vote.findOne({ note: noteId, user: userId });

    if (existing && existing.type === type) {
      await existing.deleteOne();
    } else if (existing) {
      existing.type = type;
      await existing.save();
    } else {
      await Vote.create({ note: noteId, user: userId, type });
    }

    const counts = await recomputeCounts(noteId);
    res.json(counts);
  } catch (err) {
    res.status(500).json({ message: 'Could not cast vote.' });
  }
};

exports.getMyVote = async (req, res) => {
  try {
    const vote = await Vote.findOne({ note: req.params.id, user: req.user._id });
    res.json({ type: vote ? vote.type : null });
  } catch (err) {
    res.status(500).json({ message: 'Could not load vote.' });
  }
};
