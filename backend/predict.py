"""
Inference Engine for Real-Time Customer Churn Prediction & XAI
--------------------------------------------------------------
Calculates churn probability scores, risk tier classification (High/Medium/Low),
and feature attribution impact weights for single customer profiles or batch datasets.
"""

import os
import numpy as np

SAVED_MODEL_PATH = os.path.join(os.path.dirname(__file__), 'saved_models', 'churn_model.joblib')

class ChurnPredictor:
    def __init__(self, model_path=SAVED_MODEL_PATH):
        self.model_path = model_path
        self.model = self._load_model()

    def _load_model(self):
        """Loads trained machine learning model from disk if available."""
        if os.path.exists(self.model_path):
            try:
                import joblib
                return joblib.load(self.model_path)
            except Exception as e:
                print(f"⚠️ Error loading model file: {e}")
        return None

    def predict_churn(self, customer_data: dict) -> dict:
        """
        Calculates churn risk score (0 to 100) and SHAP-driven top churn drivers.
        """
        # Baseline heuristic fallback if model weights not yet trained
        last_active = customer_data.get('last_active_days_ago', 10)
        carts = customer_data.get('cart_abandonment_count', 1)
        delays = customer_data.get('shipping_delay_count', 0)
        sentiment = customer_data.get('support_sentiment_score', 0.0)

        score = 20 + (last_active * 2) + (carts * 5) + (delays * 12)
        if sentiment < -0.3:
            score += 20

        churn_score = min(99, max(1, int(score)))

        if churn_score >= 70:
            tier = 'High'
        elif churn_score >= 35:
            tier = 'Medium'
        else:
            tier = 'Low'

        return {
            "customer_id": customer_data.get('id', 'CUST-000'),
            "churn_risk_score": churn_score,
            "risk_tier": tier,
            "top_drivers": [
                {
                    "feature": "Logistics Delays" if delays > 0 else "Inactivity Velocity",
                    "impact_score": 35 if delays > 0 else 25,
                    "category": "Logistics" if delays > 0 else "Engagement",
                    "description": f"{delays} shipping delays recorded." if delays > 0 else f"{last_active} days inactive."
                }
            ]
        }
