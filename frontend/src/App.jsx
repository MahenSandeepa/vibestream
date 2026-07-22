// frontend/src/App.jsx
import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [catalog, setCatalog] = useState([]);
  const [selectedTrackId, setSelectedTrackId] = useState('');
  const [targetSong, setTargetSong] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCatalog = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/recommendations');
        setCatalog(response.data);
        if (response.data.length > 0) {
          setSelectedTrackId(response.data[0].track_id);
        }
      } catch (err) {
        console.error("Catalog fetch error:", err);
        setError("Could not load music catalog. Is the backend running?");
      }
    };
    fetchCatalog();
  }, []);

  const fetchRecommendations = async () => {
    if (!selectedTrackId) return;
    setLoading(true);
    setError(null);
    
    try {
      const response = await axios.get(`http://localhost:5000/api/recommendations/${selectedTrackId}`);
      setTargetSong(response.data.target_analyzed);
      setRecommendations(response.data.recommended_tracks);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch recommendations from the AI engine.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="vibestream-container">
      <h1>VibeStream AI 🎧</h1>
      <p>Select a track from your library to generate tailored content-based AI recommendations.</p>
      
      <div className="controls-group">
        <select 
          value={selectedTrackId} 
          onChange={(e) => setSelectedTrackId(e.target.value)}
        >
          {catalog.length === 0 && <option>Loading songs...</option>}
          {catalog.map((track) => (
            <option key={track.track_id} value={track.track_id}>
              {track.title} — {track.artist}
            </option>
          ))}
        </select>

        <button 
          onClick={fetchRecommendations} 
          disabled={loading || catalog.length === 0}
        >
          {loading ? 'Analyzing...' : 'Match Tracks'}
        </button>
      </div>

      {error && <div className="error-box">{error}</div>}

      {targetSong && (
        <div className="results-section">
          <h2>Because you listened to <span className="highlight-song">{targetSong}</span>:</h2>
          
          <div>
            {recommendations.map((track) => (
              <div key={track.track_id} className="track-card">
                <div>
                  <div className="track-title">{track.title}</div>
                  <div className="track-artist">by {track.artist}</div>
                </div>
                <div className="progress-track">
                  <div className="progress-fill" style={{ width: `${track.match_score * 100}%` }}></div>
                </div>
                <span className="confidence-text">
                  Similarity Score: {(track.match_score * 100).toFixed(1)}%
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;