// backend/models/Track.js
const mongoose = require('mongoose');

const trackSchema = new mongoose.Schema({
    track_id: { 
        type: String, 
        required: true, 
        unique: true 
    },
    title: { 
        type: String, 
        required: true 
    },
    artist: { 
        type: String, 
        required: true 
    },
    tempo: { 
        type: Number, 
        required: true 
    },
    energy: { 
        type: Number, 
        required: true 
    },
    danceability: { 
        type: Number, 
        required: true 
    },
    valence: { 
        type: Number, 
        required: true 
    }
}, { timestamps: true });

module.exports = mongoose.model('Track', trackSchema);