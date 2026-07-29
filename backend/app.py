from flask import Flask, jsonify
from flask_cors import CORS
import os

from routes.customer_routes import customer_bp
from routes.prediction_routes import prediction_bp
from routes.recommendation_routes import recommendation_bp
from routes.dataset_routes import dataset_bp

def create_app():
    app = Flask(__name__)
    CORS(app)

    # Register API Blueprints
    app.register_blueprint(customer_bp, url_prefix='/api/v1/customers')
    app.register_blueprint(prediction_bp, url_prefix='/api/v1/predict')
    app.register_blueprint(recommendation_bp, url_prefix='/api/v1/recommendations')
    app.register_blueprint(dataset_bp, url_prefix='/api/v1/dataset')

    @app.route('/health', methods=['GET'])
    def health_check():
        return jsonify({
            "status": "healthy",
            "service": "LoyalLens AI - Churn Prediction API",
            "version": "1.0.0"
        }), 200

    return app

if __name__ == '__main__':
    app = create_app()
    port = int(os.environ.get('PORT', 5000))
    print(f"🚀 Starting LoyalLens Flask Server on port {port}...")
    app.run(host='0.0.0.0', port=port, debug=True)
