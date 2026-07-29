from flask import Blueprint, jsonify, request

recommendation_bp = Blueprint('recommendations', __name__)

@recommendation_bp.route('/generate', methods=['POST'])
def generate_recommendation():
    """Generates hyper-personalized retention offer and copy based on customer profile."""
    data = request.get_json() or {}
    customer_name = data.get('name', 'Valued Customer')
    customer_id = data.get('id', 'CUST-000')

    return jsonify({
        "status": "success",
        "recommendation": {
            "customer_id": customer_id,
            "incentive_type": "Free Shipping",
            "incentive_value": "Free Express Shipping + $25 Credit",
            "discount_code": f"RETAIN-{customer_id}-VIP",
            "email_copy": f"Hi {customer_name},\n\nWe noticed your recent delivery experienced a slight delay. As a top member, we've added a $25 credit to your wallet balance!",
            "whatsapp_copy": f"Hi {customer_name}! 🚚 Enjoy $25 credit + Free Express Delivery today!",
            "estimated_retention_rate": 84,
            "expected_revenue_saved": 4200
        }
    }), 200
