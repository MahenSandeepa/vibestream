// backend/routes/recommendationRoutes.js
const express = require('express');
const router = express.Router();
const recommendationController = require('../controllers/recommendationController');

// 1. ADD THIS LINE: GET /api/recommendations (Handles the dropdown catalog fetch)
router.get('/', recommendationController.getAllTracks);

// 2. Existing Route: GET /api/recommendations/:trackId
router.get('/:trackId', recommendationController.getRecommendations);

module.exports = router;