"""
=============================================================================
Model Training & MLflow Experiment Tracking Engine
=============================================================================
1. Performs 80/20 stratified train/test split
2. Trains XGBoost Classifier
3. Computes Accuracy, Precision, Recall, F1-Score, ROC-AUC & Confusion Matrix
4. Calculates Population Stability Index (PSI) for feature data drift checks
5. Logs all metrics, hyperparams, and model artifacts to MLflow & saves trained_model.pkl
=============================================================================
"""

import os
import sys
import joblib
import numpy as np
import pandas as pd

# Add ml_project root directory to sys.path
PROJECT_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
if PROJECT_ROOT not in sys.path:
    sys.path.insert(0, PROJECT_ROOT)

import mlflow
import mlflow.xgboost

from sklearn.model_selection import train_test_split
from sklearn.metrics import (
    accuracy_score,
    precision_score,
    recall_score,
    f1_score,
    roc_auc_score,
    confusion_matrix
)
import xgboost as xgb

from src.config import (
    PROJECT_NAME,
    MODEL_PARAMS,
    MODEL_SAVE_PATH,
    MLFLOW_TRACKING_URI
)
from src.data_pipeline import run_data_pipeline

def calculate_psi(expected: np.ndarray, actual: np.ndarray, num_buckets: int = 10) -> float:
    """Computes Population Stability Index (PSI) to detect feature distribution drift."""
    def scale_range(val, min_val, max_val):
        return (val - min_val) / (max_val - min_val + 1e-6)

    min_v, max_v = min(expected.min(), actual.min()), max(expected.max(), actual.max())
    exp_scaled = scale_range(expected, min_v, max_v)
    act_scaled = scale_range(actual, min_v, max_v)

    buckets = np.linspace(0, 1, num_buckets + 1)
    exp_counts, _ = np.histogram(exp_scaled, bins=buckets)
    act_counts, _ = np.histogram(act_scaled, bins=buckets)

    exp_pct = np.where(exp_counts == 0, 0.0001, exp_counts) / len(expected)
    act_pct = np.where(act_counts == 0, 0.0001, act_counts) / len(actual)

    psi_val = np.sum((act_pct - exp_pct) * np.log(act_pct / exp_pct))
    return float(psi_val)

def check_feature_drift(X_train: pd.DataFrame, X_test: pd.DataFrame):
    """Calculates PSI drift score for all features."""
    psi_scores = {}
    print("\n[Drift Check] Calculating Population Stability Index (PSI)...")
    for col in X_train.columns:
        psi = calculate_psi(X_train[col].values, X_test[col].values)
        psi_scores[col] = psi
        status = "NO DRIFT" if psi < 0.1 else ("MODERATE DRIFT" if psi < 0.25 else "HIGH DRIFT")
        if psi >= 0.1:
            print(f"  [!] Feature '{col}': PSI = {psi:.4f} ({status})")
    
    avg_psi = np.mean(list(psi_scores.values()))
    print(f"[Drift Check] Average Feature PSI: {avg_psi:.4f}")
    return psi_scores, avg_psi

def train_and_track():
    """Executes model training pipeline with MLflow tracking."""
    # 1. Run Data Pipeline
    X, y, clean_df = run_data_pipeline()

    # 2. Stratified Train/Test Split
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.20, random_state=42, stratify=y
    )
    print(f"[Train Engine] Split dataset: {X_train.shape[0]} Train | {X_test.shape[0]} Test")

    # 3. Check Data Drift (PSI)
    psi_scores, avg_psi = check_feature_drift(X_train, X_test)

    # 4. MLflow Experiment Setup
    mlflow.set_tracking_uri(MLFLOW_TRACKING_URI)
    mlflow.set_experiment(PROJECT_NAME)

    with mlflow.start_run(run_name="XGBoost_Baseline_Training"):
        print("\n[MLflow Engine] Starting MLflow Experiment Run...")
        
        # Train Model
        model = xgb.XGBClassifier(**MODEL_PARAMS)
        model.fit(X_train, y_train)

        # Predictions & Evaluations
        y_pred = model.predict(X_test)
        y_proba = model.predict_proba(X_test)[:, 1]

        acc = accuracy_score(y_test, y_pred)
        prec = precision_score(y_test, y_pred, zero_division=0)
        rec = recall_score(y_test, y_pred, zero_division=0)
        f1 = f1_score(y_test, y_pred, zero_division=0)
        auc = roc_auc_score(y_test, y_proba)
        cm = confusion_matrix(y_test, y_pred)

        print("\n[Model Metrics Summary]")
        print(f"  - Accuracy:  {acc:.4f}")
        print(f"  - Precision: {prec:.4f}")
        print(f"  - Recall:    {rec:.4f}")
        print(f"  - F1-Score:  {f1:.4f}")
        print(f"  - ROC-AUC:   {auc:.4f}")
        print(f"  - Confusion Matrix:\n{cm}")

        # Log Hyperparameters & Metrics to MLflow
        mlflow.log_params(MODEL_PARAMS)
        mlflow.log_metric("accuracy", acc)
        mlflow.log_metric("precision", prec)
        mlflow.log_metric("recall", rec)
        mlflow.log_metric("f1_score", f1)
        mlflow.log_metric("roc_auc", auc)
        mlflow.log_metric("avg_psi_drift", avg_psi)

        # Save Local Model Artifact
        os.makedirs(os.path.dirname(MODEL_SAVE_PATH), exist_ok=True)
        joblib.dump(model, MODEL_SAVE_PATH)
        print(f"[Model Registry] Saved local trained model artifact to '{MODEL_SAVE_PATH}'")

        # Log Artifact to MLflow Registry
        mlflow.xgboost.log_model(model, artifact_path="model")
        print("[MLflow Registry] Model successfully registered to MLflow tracking store.")

    return model, {"f1": f1, "auc": auc}

if __name__ == '__main__':
    train_and_track()
