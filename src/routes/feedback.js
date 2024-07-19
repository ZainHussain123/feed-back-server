const express = require('express');
const router = express.Router();
const Feedback = require('../models/Feedback');
const OpenAI = require('openai');
require('dotenv').config();

const openai = new OpenAI({
  apiKey: process.env.OPEN_AI_KEY, // This is the default and can be omitted
});
router.post('/submit', async (req, res) => {
  try {
    const { name, email, product, feedback } = req.body;
    const gptResponse = await  await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      max_tokens: 10,
      messages: [{ role: 'user', content: `I am giving you a feedback , you just have to tell me in one word only that if it is Neutral , Positive or Negative , here is the the feedback,  ${feedback}"` }],
    });
    console.log('chat response ',gptResponse.choices[0].message)
    const sentiment = gptResponse.choices[0].message.content.trim();
    const newFeedback = await Feedback.create({ name, email, product, feedback, sentiment });
    res.status(201).json({ message: 'Feedback submitted successfully', feedback: newFeedback });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


router.get('/list', async (req, res) => {
  try {
    const feedbackList = await Feedback.find({});
    res.status(200).json(feedbackList);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


module.exports = router;

