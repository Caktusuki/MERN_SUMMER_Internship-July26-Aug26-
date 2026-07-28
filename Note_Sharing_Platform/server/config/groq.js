// Groq SDK — primary AI provider
const Groq = require('groq-sdk');

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

module.exports = groq;

// Gemini is on standby — see config/gemini.js
