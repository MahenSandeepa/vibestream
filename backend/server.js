// Wire Up the Main Stream
// Imports dependencies, connects to the database, and starts listening for API requests
// server.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Import Custom Routes
const recommendationRoutes = require('./routes/recommendationRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Allows the server to accept JSON data

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ Database connected successfully'))
  .catch((err) => console.error('❌ Database connection error:', err));

// ==========================================
// API ROUTES
// ==========================================

// Initial Test Route / Health Check
app.get('/api/status', (req, res) => {
  res.json({ message: 'VibeStream Node.js API is live and routing' });
});

// AI Recommendation Route Bridge
// This pipes any requests coming into /api/recommendations to our recommendation router
app.use('/api/recommendations', recommendationRoutes);

// ==========================================
// START SERVER
// ==========================================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server listening on port ${PORT}`);
});