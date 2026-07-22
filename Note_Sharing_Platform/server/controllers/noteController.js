const Note = require('../models/Note');

const createNote = async (req, res, next) => {
  try {
    const { title, subject, course, description } = req.body;

    if (!title || !subject) {
      return res.status(400).json({ message: 'Title and subject are required' });
    }

    if (!req.file) {
      return res.status(400).json({ message: 'Please upload a file' });
    }

    const fileType = req.file.originalname.split('.').pop().toLowerCase();
    const normalizedType = fileType === 'docx' ? 'doc' : fileType === 'pptx' ? 'ppt' : fileType;

    const note = await Note.create({
      title,
      subject,
      course,
      description,
      fileUrl: req.file.path || req.file.secure_url,
      fileType: normalizedType,
      uploader: req.user._id,
    });

    res.status(201).json(note);
  } catch (error) {
    next(error);
  }
};

const getNotes = async (req, res, next) => {
  try {
    const { search, subject } = req.query;
    const filter = {};

    if (subject) {
      filter.subject = subject;
    }

    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { course: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }

    const notes = await Note.find(filter)
      .populate('uploader', 'username')
      .sort({ createdAt: -1 });

    res.json(notes);
  } catch (error) {
    next(error);
  }
};

const getNoteById = async (req, res, next) => {
  try {
    const note = await Note.findById(req.params.id).populate('uploader', 'username email');
    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }
    res.json(note);
  } catch (error) {
    next(error);
  }
};

const downloadNote = async (req, res, next) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }

    note.downloads += 1;
    await note.save();

    res.json({ fileUrl: note.fileUrl });
  } catch (error) {
    next(error);
  }
};

const getMyNotes = async (req, res, next) => {
  try {
    const notes = await Note.find({ uploader: req.user._id })
      .populate('uploader', 'username')
      .sort({ createdAt: -1 });

    res.json(notes);
  } catch (error) {
    next(error);
  }
};

module.exports = { createNote, getNotes, getNoteById, downloadNote, getMyNotes };
