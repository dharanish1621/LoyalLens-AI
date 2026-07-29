import os

# Project Parameters
PROJECT_NAME = "E-Commerce Customer Churn Prediction"
BUSINESS_ENTITY = "customer"
TARGET_COLUMN = "Churned"
POSITIVE_CLASS_MEANING = "1 = Customer Churned, 0 = Customer Retained"

# File Paths
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
RAW_DATA_PATH = os.path.join(BASE_DIR, "data", "raw_dataset.csv")
REJECTED_DATA_PATH = os.path.join(BASE_DIR, "data", "rejected_records.csv")
MODEL_SAVE_PATH = os.path.join(BASE_DIR, "models", "trained_model.pkl")
ENCODERS_SAVE_PATH = os.path.join(BASE_DIR, "models", "label_encoders.pkl")
MLFLOW_TRACKING_URI = "sqlite:///" + os.path.join(BASE_DIR, "mlflow.db")

# Features List & Categories
FEATURE_COLUMNS = [
    "Age",
    "Gender",
    "Country",
    "City",
    "Membership_Years",
    "Login_Frequency",
    "Session_Duration_Avg",
    "Pages_Per_Session",
    "Cart_Abandonment_Rate",
    "Wishlist_Items",
    "Total_Purchases",
    "Average_Order_Value",
    "Days_Since_Last_Purchase",
    "Discount_Usage_Rate",
    "Returns_Rate",
    "Email_Open_Rate",
    "Customer_Service_Calls",
    "Product_Reviews_Written",
    "Social_Media_Engagement_Score",
    "Mobile_App_Usage",
    "Payment_Method_Diversity",
    "Lifetime_Value",
    "Credit_Balance",
    "Signup_Quarter"
]

CATEGORICAL_COLUMNS = ["Gender", "Country", "City", "Signup_Quarter"]

# Baseline Model Hyperparameters (XGBoost)
MODEL_PARAMS = {
    "max_depth": 5,
    "n_estimators": 100,
    "learning_rate": 0.05,
    "eval_metric": "logloss",
    "random_state": 42,
    "n_jobs": -1
}

# Risk Banding Thresholds
RISK_BANDS = {
    "Critical": 0.75,
    "High": 0.50,
    "Medium": 0.25,
    "Low": 0.00
}

# Automated Downstream Actions per Risk Band
DOWNSTREAM_ACTIONS = {
    "Critical": "Trigger Autonomous VIP Concierge call + instant 25% discount code + WhatsApp rescue alert.",
    "High": "Dispatch automated email with Free Express Delivery credit + $25 promo code.",
    "Medium": "Add account to weekly automated re-engagement campaign list.",
    "Low": "Maintain standard loyalty rewards; no rescue intervention needed."
}

# Human-Readable SHAP Driver Templates per Feature
SHAP_EXPLANATION_TEMPLATES = {
    "Days_Since_Last_Purchase": "High inactivity (days since last purchase: {value}) indicating churn risk.",
    "Cart_Abandonment_Rate": "Elevated cart abandonment rate ({value}%) showing purchase friction.",
    "Customer_Service_Calls": "High volume of customer service calls ({value}) indicating product frustration.",
    "Returns_Rate": "High order return rate ({value}%) indicating product dissatisfaction.",
    "Login_Frequency": "Low login frequency ({value} logins/mo) indicating engagement decay.",
    "Discount_Usage_Rate": "High price sensitivity ({value}% discount usage) without active promo.",
    "Lifetime_Value": "High customer lifetime value (${value}) exposed to churn risk.",
    "Session_Duration_Avg": "Decreased average session duration ({value} mins).",
    "Pages_Per_Session": "Reduced browsing depth ({value} pages/session).",
    "Email_Open_Rate": "Low email open rate ({value}%) showing communication fatigue."
}
