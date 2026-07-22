const Rating = require('../models/Rating');
const Note = require('../models/Note');

const createRating = async (req, res, next) => {
  try {
    const { rating, comment } = req.body;
    const noteId = req.params.id;

    if (!rating || rating < 1 || rating > 5) {
      return res.status(400).json({ message: 'Rating must be between 1 and 5' });
    }

    const note = await Note.findById(noteId);
    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }

    const existingRating = await Rating.findOne({ note: noteId, user: req.user._id });
    if (existingRating) {
      return res.status(400).json({ message: 'You have already rated this note' });
    }

    const newRating = await Rating.create({
      note: noteId,
      user: req.user._id,
      rating,
      comment,
    });

    // Recompute avg rating
    const result = await Rating.aggregate([
      { $match: { note: note._id } },
      { $group: { _id: null, avg: { $avg: '$rating' } } },
    ]);
    const avg = result.length > 0 ? Math.round(result[0].avg * 10) / 10 : 0;
    await Note.findByIdAndUpdate(noteId, { avgRating: avg });

    res.status(201).json(newRating);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: 'You have already rated this note' });
    }
    next(error);
  }
};

const getRatingsForNote = async (req, res, next) => {
  try {
    const ratings = await Rating.find({ note: req.params.id })
      .populate('user', 'username')
      .sort({ createdAt: -1 });

    res.json(ratings);
  } catch (error) {
    next(error);
  }
};

module.exports = { createRating, getRatingsForNote };
