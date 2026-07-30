const mongoose = require('mongoose');

const voteSchema = new mongoose.Schema({
  note: { type: mongoose.Schema.Types.ObjectId, ref: 'Note', required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, enum: ['up', 'down'], required: true },
}, { timestamps: true });

voteSchema.index({ note: 1, user: 1 }, { unique: true });

module.exports = mongoose.model('Vote', voteSchema);
