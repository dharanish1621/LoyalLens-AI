from flask import Blueprint, jsonify, request

customer_bp = Blueprint('customers', __name__)

@customer_bp.route('/', methods=['GET'])
def get_customers():
    """Retrieve customer profiles with churn scores and RFM segments."""
    # Placeholder response structure
    return jsonify({
        "status": "success",
        "total_records": 7,
        "data": [
            {
                "id": "CUST-9021",
                "name": "Alexandra Wright",
                "email": "a.wright@techline.com",
                "segment": "VIP",
                "clv": 8450,
                "churn_risk_score": 92,
                "risk_tier": "High"
            }
        ]
    }), 200

@customer_bp.route('/<customer_id>', methods=['GET'])
def get_customer_detail(customer_id):
    """Retrieve detailed 360 profile and behavioral timeline for a customer."""
    return jsonify({
        "status": "success",
        "customer_id": customer_id,
        "detail": {
            "name": "Alexandra Wright",
            "clv": 8450,
            "churn_risk_score": 92,
            "risk_tier": "High"
        }
    }), 200
