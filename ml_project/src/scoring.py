"""
=============================================================================
Inference & SHAP Explainability Engine
=============================================================================
1. Loads trained model weights and LabelEncoders
2. Calculates P(positive class) probability & assigns Risk Level
3. Computes TreeExplainer SHAP attributions for top feature drivers
4. Generates human-readable driver explanations & maps automated downstream actions
=============================================================================
"""

import os
import sys
import joblib
import numpy as np
import pandas as pd
import shap

PROJECT_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
if PROJECT_ROOT not in sys.path:
    sys.path.insert(0, PROJECT_ROOT)

from src.config import (
    MODEL_SAVE_PATH,
    ENCODERS_SAVE_PATH,
    FEATURE_COLUMNS,
    CATEGORICAL_COLUMNS,
    RISK_BANDS,
    DOWNSTREAM_ACTIONS,
    SHAP_EXPLANATION_TEMPLATES
)

class InferenceEngine:
    def __init__(self, model_path=MODEL_SAVE_PATH, encoders_path=ENCODERS_SAVE_PATH):
        if not os.path.exists(model_path):
            raise FileNotFoundError(f"[!] Model file not found at {model_path}. Run src/train.py first.")
        
        self.model = joblib.load(model_path)
        self.encoders = joblib.load(encoders_path) if os.path.exists(encoders_path) else {}
        self.explainer = shap.TreeExplainer(self.model)
        print("[Inference Engine] Model and SHAP TreeExplainer initialized successfully.")

    def _preprocess_input(self, raw_input: dict) -> pd.DataFrame:
        """Preprocesses single feature dictionary input into model feature vector."""
        df = pd.DataFrame([raw_input])

        for col in FEATURE_COLUMNS:
            if col not in df.columns:
                df[col] = 0

        for col in CATEGORICAL_COLUMNS:
            df[col] = df[col].astype(str)
            if col in self.encoders:
                le = self.encoders[col]
                df[col] = df[col].map(lambda s: int(le.transform([s])[0]) if s in le.classes_ else 0)
            else:
                df[col] = 0

        return df[FEATURE_COLUMNS].copy()

    def _determine_risk_level(self, probability: float) -> str:
        """Maps probability score to Risk Level bands."""
        if probability >= RISK_BANDS["Critical"]:
            return "Critical"
        elif probability >= RISK_BANDS["High"]:
            return "High"
        elif probability >= RISK_BANDS["Medium"]:
            return "Medium"
        else:
            return "Low"

    def predict_record(self, entity_id: str, raw_features: dict) -> dict:
        """Computes scoring, SHAP attributions, risk banding, and automated action."""
        X_single = self._preprocess_input(raw_features)
        
        prob = float(self.model.predict_proba(X_single)[0, 1])
        pred = int(prob >= 0.5)
        risk_level = self._determine_risk_level(prob)

        shap_values = self.explainer.shap_values(X_single)[0]
        
        top_indices = np.argsort(shap_values)[::-1][:3]
        top_drivers = []

        for idx in top_indices:
            feat_name = FEATURE_COLUMNS[idx]
            shap_val = float(shap_values[idx])
            raw_val = raw_features.get(feat_name, X_single[feat_name].values[0])

            template = SHAP_EXPLANATION_TEMPLATES.get(
                feat_name,
                f"Feature '{feat_name}' contributed +{shap_val:.2f} risk weight (value: {{value}})."
            )
            explanation = template.format(value=raw_val)

            top_drivers.append({
                "feature": feat_name,
                "shap_value": round(shap_val, 4),
                "feature_value": str(raw_val),
                "explanation": explanation
            })

        recommended_action = DOWNSTREAM_ACTIONS.get(risk_level, "No action required.")

        return {
            "entity_id": entity_id,
            "prediction": pred,
            "probability": round(prob, 4),
            "risk_level": risk_level,
            "top_risk_drivers": top_drivers,
            "recommended_action": recommended_action
        }
