from flask import Blueprint, jsonify, request
from predict import ChurnPredictor

prediction_bp = Blueprint('prediction', __name__)
predictor = ChurnPredictor()

@prediction_bp.route('/single', methods=['POST'])
def predict_single():
    """Predict churn score and feature attributions for a single customer payload."""
    data = request.get_json() or {}
    result = predictor.predict_churn(data)
    return jsonify({
        "status": "success",
        "result": result
    }), 200

@prediction_bp.route('/batch', methods=['POST'])
def predict_batch():
    """Predict churn risk across a batch dataset of customer profiles."""
    payload = request.get_json() or []
    customers = payload.get('customers', [])
    results = [predictor.predict_churn(c) for c in customers]
    return jsonify({
        "status": "success",
        "total_processed": len(results),
        "predictions": results
    }), 200
