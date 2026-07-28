const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  passwordHash: {
    type: String,
    required: true,
  },
  bio: {
    type: String,
    default: '',
  },
  resetToken: {
    type: String,
    default: null,
  },
  resetExpires: {
    type: Date,
    default: null,
  },
  verified: {
    type: Boolean,
    default: false,
  },
  verifyCode: {
    type: String,
    default: null,
  },
  verifyExpires: {
    type: Date,
    default: null,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('User', userSchema);
