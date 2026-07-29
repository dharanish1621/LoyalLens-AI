"""
=============================================================================
LoyalLens AI - Customer Churn Prediction Machine Learning Pipeline
=============================================================================
Automated ML Training & Evaluation Script:
1. Loads dataset from backend/dataset/ (e.g. ecommerce_customer_churn_dataset.csv)
2. Handles missing values & cleans data
3. Encodes categorical variables using LabelEncoder
4. Splits data (80% Train, 20% Test)
5. Trains & compares Logistic Regression, Decision Tree, Random Forest & XGBoost
6. Evaluates Accuracy, Precision, Recall, F1-Score & ROC-AUC
7. Automatically selects the best performing model based on F1 / ROC-AUC score
8. Exports best model, label encoders, and feature schema into backend/saved_models/
=============================================================================
"""

import os
import sys
import glob
import joblib
import pandas as pd
import numpy as np

# Force UTF-8 output encoding for Windows console compatibility
if sys.platform == 'win32':
    sys.stdout.reconfigure(encoding='utf-8')

from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
from sklearn.metrics import (
    accuracy_score,
    precision_score,
    recall_score,
    f1_score,
    roc_auc_score
)

from sklearn.linear_model import LogisticRegression
from sklearn.tree import DecisionTreeClassifier
from sklearn.ensemble import RandomForestClassifier
from xgboost import XGBClassifier

# File Paths Configuration
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATASET_DIR = os.path.join(BASE_DIR, "dataset")
SAVED_MODELS_DIR = os.path.join(BASE_DIR, "saved_models")

os.makedirs(SAVED_MODELS_DIR, exist_ok=True)

def find_dataset_file(dataset_dir=DATASET_DIR):
    """Dynamically finds the dataset CSV/XLSX file inside dataset directory."""
    csv_files = glob.glob(os.path.join(dataset_dir, "*.csv"))
    excel_files = glob.glob(os.path.join(dataset_dir, "*.xlsx"))
    
    all_files = csv_files + excel_files
    if not all_files:
        raise FileNotFoundError(f"No CSV or XLSX dataset found inside {dataset_dir}")
    
    selected_file = all_files[0]
    print(f"[+] Found dataset file: {os.path.basename(selected_file)}")
    return selected_file

def load_and_clean_data(file_path):
    """Loads dataset and performs missing value handling and column cleaning."""
    print("\n--- 1. Loading & Cleaning Dataset ---")
    if file_path.endswith('.csv'):
        df = pd.read_csv(file_path)
    else:
        df = pd.read_excel(file_path)
        
    print(f"[*] Initial Dataset Shape: {df.shape[0]} rows, {df.shape[1]} columns")

    # Clean column names (strip whitespace)
    df.columns = df.columns.str.strip()

    # Detect missing values
    missing_counts = df.isnull().sum()
    total_missing = missing_counts.sum()
    print(f"[*] Total Missing Values Count: {total_missing}")

    if total_missing > 0:
        # Fill numerical missing values with median
        num_cols = df.select_dtypes(include=[np.number]).columns
        df[num_cols] = df[num_cols].fillna(df[num_cols].median())

        # Fill categorical missing values with mode
        cat_cols = df.select_dtypes(include=['object', 'category', 'string']).columns
        for col in cat_cols:
            if len(df[col].mode()) > 0:
                df[col] = df[col].fillna(df[col].mode()[0])
            else:
                df[col] = df[col].fillna("Unknown")
        print("[+] Missing values handled (median for numeric, mode for categorical).")

    return df

def identify_columns(df):
    """Identifies target column, identifier columns (to drop), and feature columns."""
    possible_targets = [
        'Churned', 'Churn', 'Churn_Label', 'Churn Label', 'Target',
        'churned', 'churn', 'churn_label', 'IsChurn', 'Is_Churn', 'Churn_Status'
    ]
    target_col = None
    for col in possible_targets:
        if col in df.columns:
            target_col = col
            break

    if target_col is None:
        # Default to last column if no matching target keyword found
        target_col = df.columns[-1]

    print(f"[*] Target Column Identified: '{target_col}'")

    # Identifier columns to exclude from feature matrix
    drop_candidates = [
        'Customer Name', 'Name', 'Email', 'Customer ID', 'id', 'customer_id',
        'ID', 'Email Address', 'Customer_Name', 'Customer_ID', 'User_ID'
    ]
    cols_to_drop = [c for c in drop_candidates if c in df.columns]

    if cols_to_drop:
        print(f"[*] Excluding non-predictive identifier columns: {cols_to_drop}")

    return target_col, cols_to_drop

def encode_categorical_features(df, target_col, cols_to_drop):
    """Encodes categorical columns using LabelEncoder and returns feature matrix X and target y."""
    print("\n--- 2. Encoding Categorical Features & Formatting Target ---")
    df_clean = df.drop(columns=cols_to_drop)

    X = df_clean.drop(columns=[target_col]).copy()
    y_raw = df_clean[target_col].copy()

    # Encode Target Column y to integer (0 or 1)
    if y_raw.dtype == 'object' or y_raw.dtype.name == 'category' or isinstance(y_raw.iloc[0], str):
        target_encoder = LabelEncoder()
        y = target_encoder.fit_transform(y_raw.astype(str))
        print(f"[+] Encoded target column '{target_col}' using LabelEncoder. Classes: {list(target_encoder.classes_)}")
    else:
        y = y_raw.astype(int).values

    label_encoders = {}
    for col in X.columns:
        if X[col].dtype == 'object' or X[col].dtype.name == 'category' or X[col].dtype == 'string':
            le = LabelEncoder()
            X[col] = le.fit_transform(X[col].astype(str))
            label_encoders[col] = le
            print(f"[+] LabelEncoder fitted for column: '{col}' ({len(le.classes_)} unique categories)")

    return X, y, label_encoders

def train_and_evaluate(X, y):
    """Splits dataset 80/20, trains 4 ML models, and evaluates 5 classification metrics."""
    print("\n--- 3. Train/Test Split (80% Train, 20% Test) ---")
    
    unique_classes = np.unique(y)
    stratify_param = y if len(unique_classes) > 1 and min(np.bincount(y)) > 1 else None

    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.20, random_state=42, stratify=stratify_param
    )

    print(f"[*] Training Samples: {X_train.shape[0]} | Testing Samples: {X_test.shape[0]}")

    models = {
        "Logistic Regression": LogisticRegression(max_iter=1000, random_state=42),
        "Decision Tree": DecisionTreeClassifier(random_state=42),
        "Random Forest": RandomForestClassifier(n_estimators=100, random_state=42, n_jobs=-1),
        "XGBoost": XGBClassifier(n_estimators=100, eval_metric='logloss', random_state=42, n_jobs=-1)
    }

    results = {}

    print("\n--- 4. Model Training & Evaluation Summary ---")
    print(f"{'Model Name':<22} | {'Accuracy':<10} | {'Precision':<10} | {'Recall':<10} | {'F1-Score':<10} | {'ROC-AUC':<10}")
    print("-" * 82)

    for name, model in models.items():
        model.fit(X_train, y_train)
        y_pred = model.predict(X_test)
        
        if hasattr(model, "predict_proba"):
            y_proba = model.predict_proba(X_test)[:, 1] if len(unique_classes) > 1 else y_pred
        else:
            y_proba = y_pred

        acc = accuracy_score(y_test, y_pred)
        prec = precision_score(y_test, y_pred, zero_division=0)
        rec = recall_score(y_test, y_pred, zero_division=0)
        f1 = f1_score(y_test, y_pred, zero_division=0)
        
        try:
            auc = roc_auc_score(y_test, y_proba)
        except Exception:
            auc = 0.5

        results[name] = {
            "model": model,
            "accuracy": acc,
            "precision": prec,
            "recall": rec,
            "f1_score": f1,
            "roc_auc": auc
        }

        print(f"{name:<22} | {acc:<10.4f} | {prec:<10.4f} | {rec:<10.4f} | {f1:<10.4f} | {auc:<10.4f}")

    return results

def select_and_save_best_model(results, label_encoders, feature_columns):
    """Automatically selects best model by F1-Score & ROC-AUC and saves model + encoders."""
    print("\n--- 5. Automatic Best Model Selection & Export ---")
    
    best_model_name = max(results.keys(), key=lambda m: (results[m]['f1_score'] * 0.5 + results[m]['roc_auc'] * 0.5))
    best_info = results[best_model_name]
    best_model = best_info['model']

    print(f"[+] Best Performing Model: {best_model_name}")
    print(f"   - Accuracy:  {best_info['accuracy']:.4f}")
    print(f"   - Precision: {best_info['precision']:.4f}")
    print(f"   - Recall:    {best_info['recall']:.4f}")
    print(f"   - F1-Score:  {best_info['f1_score']:.4f}")
    print(f"   - ROC-AUC:   {best_info['roc_auc']:.4f}")

    model_export_path = os.path.join(SAVED_MODELS_DIR, "best_churn_model.joblib")
    encoders_export_path = os.path.join(SAVED_MODELS_DIR, "label_encoders.joblib")
    features_export_path = os.path.join(SAVED_MODELS_DIR, "feature_columns.joblib")

    joblib.dump(best_model, model_export_path)
    joblib.dump(label_encoders, encoders_export_path)
    joblib.dump(feature_columns, features_export_path)

    print(f"[+] Saved best model ({best_model_name}) to: '{model_export_path}'")
    print(f"[+] Saved label encoders to: '{encoders_export_path}'")
    print(f"[+] Saved feature column schema to: '{features_export_path}'")

def main():
    print("=============================================================================")
    print("Starting Machine Learning Model Training Pipeline...")
    print("=============================================================================")
    
    dataset_file = find_dataset_file()
    df = load_and_clean_data(dataset_file)
    target_col, cols_to_drop = identify_columns(df)
    
    X, y, label_encoders = encode_categorical_features(df, target_col, cols_to_drop)
    feature_columns = list(X.columns)
    
    results = train_and_evaluate(X, y)
    select_and_save_best_model(results, label_encoders, feature_columns)
    
    print("\nMachine Learning Training Pipeline Completed Successfully!")
    print("=============================================================================")

if __name__ == '__main__':
    main()
