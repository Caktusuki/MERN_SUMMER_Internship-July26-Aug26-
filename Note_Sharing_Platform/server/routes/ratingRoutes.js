const express = require('express');
const router = express.Router({ mergeParams: true });
const { createRating, getRatingsForNote } = require('../controllers/ratingController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', getRatingsForNote);
router.post('/', protect, createRating);

module.exports = router;
