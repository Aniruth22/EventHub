const express = require('express');
const router = express.Router();
const { GoogleGenerativeAI } = require('@google/generative-ai');
const Event = require('../models/Event');

// Initialize the Google AI client
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

// @route   POST /api/chat
// @desc    Handle chat messages using the Gemini API
router.post('/', async (req, res) => {
  const { message: userMessage } = req.body;

  if (!userMessage) {
    return res.status(400).json({ error: 'Message is required.' });
  }

  try {
    const allEvents = await Event.find({});
    const eventDataString = JSON.stringify(allEvents, null, 2);

    // ✅ UPDATED the model name to the latest version
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    
    const prompt = `
      You are a friendly and helpful event assistant for a website called EventHub.
      Your goal is to answer user questions based ONLY on the event data provided below.
      If the answer is not in the data, say that you don't have that information.

      Here is the list of all available events:
      ${eventDataString}

      Now, please answer this user's question: "${userMessage}"
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const reply = response.text();

    res.json({ reply });

  } catch (error) {
    console.error('Error calling Gemini API:', error);
    res.status(500).json({ error: 'Failed to get a response from the AI assistant.' });
  }
});

module.exports = router;