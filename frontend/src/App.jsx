// frontend/src/App.jsx
import { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [trackId, setTrackId] = useState('t1');
  const [targetSong, setTargetSong] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchRecommendations = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Calling our Node.js bridge on port 5000
      const response = await axios.get(`http://localhost:5000/api/recommendations/${trackId}`);
      
      setTargetSong(response.data.target_analyzed);
      setRecommendations(response.data.recommended_tracks);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch recommendations. Is the backend running?");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif', maxWidth: '600px', margin: '0 auto' }}>
      <h1>VibeStream AI 🎵</h1>
      
      <div style={{ marginBottom: '1rem' }}>
        <input 
          type="text" 
          value={trackId} 
          onChange={(e) => setTrackId(e.target.value)}
          placeholder="Enter Track ID (e.g., t1)"
          style={{ padding: '0.5rem', marginRight: '0.5rem' }}
        />
        <button onClick={fetchRecommendations} disabled={loading} style={{ padding: '0.5rem 1rem' }}>
          {loading ? 'Analyzing...' : 'Get Recommendations'}
        </button>
      </div>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {targetSong && (
        <div style={{ marginTop: '2rem' }}>
          <h2>Because you listened to: <span style={{ color: '#007BFF' }}>{targetSong}</span></h2>
          
          <ul style={{ listStyleType: 'none', padding: 0 }}>
            {recommendations.map((track) => (
              <li key={track.track_id} style={{ 
                background: '#f4f4f4', 
                margin: '1rem 0', 
                padding: '1rem', 
                borderRadius: '8px' 
              }}>
                <strong>{track.title}</strong> by {track.artist}
                <br />
                <small style={{ color: 'gray' }}>
                  AI Match Score: {(track.match_score * 100).toFixed(2)}%
                </small>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;