
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./src/routes/auth');
const feedbackRoutes = require('./src/routes/feedback');

const app = express();

// Bodyparser Middleware
app.use(express.json());

// Enable CORS
app.use(cors());

// MongoDB Configuration
const dbURI = 'mongodb://127.0.0.1:27017/feedbackApp';

mongoose.connect(dbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB Connected...'))
.catch(err => console.error('MongoDB Connection Error:', err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/feedback', feedbackRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
