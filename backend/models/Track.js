// Build the Datbase Models
// models/Track.js
const mongoose = require('mongoose');

const TrackSchema = new mongoose.Schema({
  title: { type: String, required: true },
  artist: { type: String, required: true },
  audioUrl: { type: String, required: true }, // URL to where the file is stored
  genre: { type: String, required: true },
  audioFeatures: {
    tempo: { type: Number, default: 120 },
    energy: { type: Number, default: 0.5 },
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Track', TrackSchema);
