const express = require('express');
const router = express.Router();
const {
  createNote,
  getNotes,
  getNoteById,
  downloadNote,
  getMyNotes,
} = require('../controllers/noteController');
const { protect } = require('../middleware/authMiddleware');
const upload = require('../middleware/upload');

router.get('/mine', protect, getMyNotes);
router.get('/', getNotes);
router.get('/:id', getNoteById);
router.post('/', protect, upload.single('file'), createNote);
router.get('/:id/download', downloadNote);

module.exports = router;
