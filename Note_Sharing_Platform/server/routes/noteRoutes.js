const express = require('express');
const router = express.Router();
const {
  createNote,
  getNotes,
  getNoteById,
  downloadNote,
  getMyNotes,
  updateNote,
} = require('../controllers/noteController');
const { protect } = require('../middleware/authMiddleware');
const upload = require('../middleware/upload');
const voteController = require('../controllers/voteController');
const commentController = require('../controllers/commentController');

router.get('/mine', protect, getMyNotes);
router.get('/', getNotes);
router.get('/:id', getNoteById);
router.post('/', protect, upload.single('file'), createNote);
router.get('/:id/download', downloadNote);
router.put('/:id', protect, updateNote);
router.post('/:id/vote', protect, voteController.castVote);
router.get('/:id/vote', protect, voteController.getMyVote);
router.get('/:id/comments', commentController.getCommentsForNote);
router.post('/:id/comments', protect, commentController.createComment);
router.get('/:id/comments/votes', protect, commentController.getMyVotes);
router.post('/:id/comments/:commentId/vote', protect, commentController.castVote);
router.put('/:id/comments/:commentId', protect, commentController.updateComment);
router.delete('/:id/comments/:commentId', protect, commentController.deleteComment);

module.exports = router;
