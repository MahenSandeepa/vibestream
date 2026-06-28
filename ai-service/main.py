# main.py
from fastapi import FastAPI

app = FastAPI(title="VibeStream AI Engine", version="1.0.0")

@app.get("/")
def read_root():
    return {"status": "VibeStream AI Engine is active", "framework": "FastAPI"}

@app.get("/api/ai/health")
def health_check():
    return {"status": "healthy", "database_connected": False}