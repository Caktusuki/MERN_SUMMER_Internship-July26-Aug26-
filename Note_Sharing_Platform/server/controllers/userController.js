const User = require('../models/User');
const Note = require('../models/Note');
const Rating = require('../models/Rating');

const getProfile = async (req, res, next) => {
  try {
    const notesCount = await Note.countDocuments({ uploader: req.user._id });

    const downloadStats = await Note.aggregate([
      { $match: { uploader: req.user._id } },
      { $group: { _id: null, totalDownloads: { $sum: '$downloads' } } },
    ]);
    const totalDownloads = downloadStats.length > 0 ? downloadStats[0].totalDownloads : 0;

    const avgRatingStats = await Rating.aggregate([
      { $match: { note: { $in: await Note.find({ uploader: req.user._id }).distinct('_id') } } },
      { $group: { _id: null, avgRating: { $avg: '$rating' } } },
    ]);
    const avgRating = avgRatingStats.length > 0
      ? Math.round(avgRatingStats[0].avgRating * 10) / 10
      : 0;

    res.json({
      _id: req.user._id,
      username: req.user.username,
      email: req.user.email,
      bio: req.user.bio,
      createdAt: req.user.createdAt,
      stats: {
        notesCount,
        totalDownloads,
        avgRating,
      },
    });
  } catch (error) {
    next(error);
  }
};

const updateProfile = async (req, res, next) => {
  try {
    const { bio, username } = req.body;
    const updates = {};
    if (bio !== undefined) updates.bio = bio;
    if (username) updates.username = username;

    const user = await User.findByIdAndUpdate(req.user._id, updates, {
      new: true,
      runValidators: true,
    }).select('-passwordHash');

    res.json(user);
  } catch (error) {
    next(error);
  }
};

module.exports = { getProfile, updateProfile };
