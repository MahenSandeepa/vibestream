// Wire Up the Main Stream
// Imports dependencies, connects to the database, and starts listening for API requests
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Import Custom Routes
const recommendationRoutes = require('./routes/recommendationRoutes');

const app = express();

// Middleware
// Enables CORS so the React frontend on port 5173 can communicate with this API
app.use(cors());
// Allows the server to accept and parse incoming JSON data
app.use(express.json()); 

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