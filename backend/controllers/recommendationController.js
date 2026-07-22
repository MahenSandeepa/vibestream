// backend/controllers/recommendationController.js
const axios = require('axios');
const Track = require('../models/Track'); // Ensure this points to your Track model

// 1. ADD THIS NEW FUNCTION FOR THE DROPDOWN
exports.getAllTracks = async (req, res) => {
    try {
        const tracks = await Track.find({}, 'track_id title artist');
        return res.status(200).json(tracks);
    } catch (error) {
        console.error("Error fetching track catalog:", error.message);
        return res.status(500).json({ message: "Failed to fetch track catalog." });
    }
};

// 2. Your existing recommendation function stays right below it
exports.getRecommendations = async (req, res) => {
    try {
        const { trackId } = req.params;

        const targetTrack = await Track.findOne({ track_id: trackId });
        if (!targetTrack) {
            return res.status(404).json({ message: "Target track not found in database." });
        }

        const catalog = await Track.find({ track_id: { $ne: trackId } });

        const aiServiceUrl = process.env.AI_SERVICE_URL || 'http://127.0.0.1:8000';
        
        const response = await axios.post(`${aiServiceUrl}/api/ai/recommend`, {
            target_track: {
                track_id: targetTrack.track_id,
                title: targetTrack.title,
                artist: targetTrack.artist,
                tempo: targetTrack.tempo,
                energy: targetTrack.energy,
                danceability: targetTrack.danceability,
                valence: targetTrack.valence
            },
            catalog: catalog.map(track => ({
                track_id: track.track_id,
                title: track.title,
                artist: track.artist,
                tempo: track.tempo,
                energy: track.energy,
                danceability: track.danceability,
                valence: track.valence
            }))
        });

        return res.status(200).json(response.data);

    } catch (error) {
        if (error.response) {
            console.error("❌ Python AI Error Details:", JSON.stringify(error.response.data, null, 2));
        } else {
            console.error("❌ Node.js Connection Error:", error.message);
        }

        return res.status(500).json({ 
            message: "Failed to fetch recommendations from AI engine.",
            error: error.message 
        });
    }
};