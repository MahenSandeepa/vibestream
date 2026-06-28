from fastapi import FastAPI
from pydantic import BaseModel
from typing import List
from recommendation import calculate_similar_tracks

app = FastAPI(title="VibeStream AI Engine", version="1.0.0")

# --- Define the Data Structures we expect to receive ---
class Track(BaseModel):
    track_id: str
    title: str
    artist: str
    tempo: float
    energy: float
    danceability: float
    valence: float

class RecommendationRequest(BaseModel):
    target_track: Track
    catalog: List[Track]

# --- API Routes ---
@app.get("/")
def read_root():
    return {"status": "VibeStream AI Engine is active"}

@app.post("/api/ai/recommend")
def get_recommendations(payload: RecommendationRequest):
    # Convert Pydantic models to standard dictionaries
    target = payload.target_track.dict()
    catalog = [track.dict() for track in payload.catalog]
    
    # Run the machine learning algorithm
    results = calculate_similar_tracks(target, catalog)
    
    return {
        "target_analyzed": target["title"],
        "recommended_tracks": results
    }