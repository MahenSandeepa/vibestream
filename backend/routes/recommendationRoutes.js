// backend/routes/recommendationRoutes.js
const express = require('express');
const router = express.Router();
const recommendationController = require('../controllers/recommendationController');

// GET /api/recommendations/:trackId
router.get('/:trackId', recommendationController.getRecommendations);

module.exports = router;