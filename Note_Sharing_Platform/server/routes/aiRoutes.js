const express = require('express');
const router = express.Router({ mergeParams: true });
const { summarizeNote, getRecommendations } = require('../controllers/aiController');
const { protect } = require('../middleware/authMiddleware');

router.post('/summarize', protect, summarizeNote);
router.get('/recommendations', getRecommendations);

module.exports = router;
