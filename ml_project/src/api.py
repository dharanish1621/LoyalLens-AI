"""
=============================================================================
FastAPI Real-Time Inference & Explainability Web Service
=============================================================================
Endpoints:
- GET /health   : Liveness check
- POST /predict : Real-time scoring, risk level assignment, SHAP drivers & automated actions
=============================================================================
"""

import os
import sys
import uvicorn
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field
from typing import Dict, Any

PROJECT_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
if PROJECT_ROOT not in sys.path:
    sys.path.insert(0, PROJECT_ROOT)

from src.config import PROJECT_NAME, BUSINESS_ENTITY
from src.scoring import InferenceEngine

app = FastAPI(
    title=f"{PROJECT_NAME} API",
    description=f"Production-grade scoring and SHAP explainability service for {BUSINESS_ENTITY} churn prediction.",
    version="1.0.0"
)

engine = None

@app.on_event("startup")
def load_engine():
    global engine
    try:
        engine = InferenceEngine()
        print("[API Service] FastAPI Inference Engine initialized.")
    except Exception as e:
        print(f"[API Service] Notice: Model engine not loaded yet ({e}). Run src/train.py to generate weights.")

class ScoringRequest(BaseModel):
    entity_id: str = Field(..., example="CUST-9021", description=f"Unique identifier for {BUSINESS_ENTITY}")
    features: Dict[str, Any] = Field(..., description="Dictionary of feature names and input values")

class ScoringResponse(BaseModel):
    entity_id: str
    prediction: int
    probability: float
    risk_level: str
    top_risk_drivers: Any
    recommended_action: str

@app.get("/health")
def health_check():
    """Liveness check endpoint."""
    return {
        "status": "healthy",
        "project": PROJECT_NAME,
        "engine_loaded": engine is not None
    }

@app.post("/predict", response_model=ScoringResponse)
def predict(request: ScoringRequest):
    """Computes real-time prediction, probability, risk level, SHAP drivers, and automated action."""
    global engine
    if engine is None:
        try:
            engine = InferenceEngine()
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"Model engine initialization failed: {str(e)}")

    try:
        result = engine.predict_record(request.entity_id, request.features)
        return result
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Scoring error: {str(e)}")

if __name__ == '__main__':
    uvicorn.run("src.api:app", host="0.0.0.0", port=8000, reload=True)
