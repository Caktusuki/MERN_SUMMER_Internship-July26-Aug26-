// Chatbot — uses Groq (LLaMA 3.3 70B) with rate limiting and restricted scope
const groq = require('../config/groq');

const MODEL = 'llama-3.3-70b-versatile';

// Simple in-memory rate limit: 20 requests per user per day
const rateLimits = new Map();

function cleanupLimits() {
  const now = Date.now();
  for (const [userId, data] of rateLimits) {
    if (now - data.windowStart > 86400000) rateLimits.delete(userId);
  }
}
setInterval(cleanupLimits, 600000);

function checkRateLimit(userId) {
  const now = Date.now();
  const entry = rateLimits.get(userId);
  if (!entry || now - entry.windowStart > 86400000) {
    rateLimits.set(userId, { windowStart: now, count: 1 });
    return { allowed: true, remaining: 19 };
  }
  if (entry.count >= 20) {
    return { allowed: false, remaining: 0 };
  }
  entry.count++;
  return { allowed: true, remaining: 20 - entry.count };
}

const SYSTEM_PROMPT = `You are NoteFi, a study assistant built for a college note-sharing platform.

STRICT RULES — you MUST follow these:
- ONLY help with study-related questions: explaining concepts, summarizing academic content, note organization, exam prep, and using the NoteFi platform.
- Politely decline unrelated requests (coding help, essay writing, general chit-chat, creative writing, etc.) and redirect the user back to their studies.
- Keep responses concise (2-4 sentences max unless the user asks for detail).
- Use plain text, no markdown formatting.
- If asked about yourself, say you are NoteFi's AI study assistant.

Example decline: "I'm designed to help with your studies! Try asking me about a subject, concept, or your notes instead."`;

const chat = async (req, res, next) => {
  try {
    const { message, noteContext, history } = req.body;

    if (!message || !message.trim()) {
      return res.status(400).json({ message: 'Message is required' });
    }

    const userId = req.user?._id?.toString() || req.ip;
    const rateCheck = checkRateLimit(userId);
    if (!rateCheck.allowed) {
      return res.status(429).json({ message: 'You\'ve reached the daily chat limit (20 messages). Try again tomorrow.' });
    }

    let systemPrompt = SYSTEM_PROMPT;

    if (noteContext) {
      systemPrompt += `\n\nThe student is currently viewing this note:
Title: ${noteContext.title}
Subject: ${noteContext.subject}
Course: ${noteContext.course || 'N/A'}
Description: ${noteContext.description || 'N/A'}
Summary: ${noteContext.summary || 'N/A'}

Answer questions related to this note when appropriate. If the student asks about something unrelated to this note or their studies, redirect them.`;
    }

    const messages = [{ role: 'system', content: systemPrompt }];

    if (Array.isArray(history)) {
      const recent = history.slice(-10);
      recent.forEach((h) => {
        messages.push({ role: h.role === 'bot' ? 'assistant' : 'user', content: h.text });
      });
    }

    messages.push({ role: 'user', content: message });

    const completion = await groq.chat.completions.create({
      model: MODEL,
      messages,
    });

    const reply = completion.choices[0].message.content;

    res.json({ reply, remaining: rateCheck.remaining });
  } catch (error) {
    next(error);
  }
};

module.exports = { chat };
