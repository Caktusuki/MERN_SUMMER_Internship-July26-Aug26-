// Summarize & recommendations — uses Groq (LLaMA 3.3 70B)
const Note = require('../models/Note');
const groq = require('../config/groq');

const MODEL = 'llama-3.3-70b-versatile';

const summarizeNote = async (req, res, next) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }

    if (note.summary) {
      return res.json({ summary: note.summary, tags: note.tags });
    }

    const prompt = `You are a study assistant. Write a detailed summary of the following note in 4-5 sentences. Cover the main topics, key concepts, and what a student should take away from it. Then extract 3-5 relevant tags/keywords.

Title: ${note.title}
Subject: ${note.subject}
Course: ${note.course || 'N/A'}
Description: ${note.description}

Respond in this exact JSON format only, no extra text:
{
  "summary": "your 4-5 sentence summary here",
  "tags": ["tag1", "tag2", "tag3"]
}`;

    const completion = await groq.chat.completions.create({
      model: MODEL,
      messages: [{ role: 'user', content: prompt }],
    });

    const text = completion.choices[0].message.content;

    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      return res.status(500).json({ message: 'Failed to parse AI response' });
    }

    const parsed = JSON.parse(jsonMatch[0]);

    note.summary = parsed.summary;
    note.tags = parsed.tags || [];
    await note.save();

    res.json({ summary: note.summary, tags: note.tags });
  } catch (error) {
    next(error);
  }
};

const getRecommendations = async (req, res, next) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }

    const query = {
      _id: { $ne: note._id },
      $or: [
        { subject: note.subject },
        { tags: { $in: note.tags } },
      ],
    };

    const recommendations = await Note.find(query)
      .populate('uploader', 'username')
      .limit(5)
      .sort({ downloads: -1 });

    res.json(recommendations);
  } catch (error) {
    next(error);
  }
};

module.exports = { summarizeNote, getRecommendations };

// Gemini summarize logic is on standby in controllers/aiController.js
