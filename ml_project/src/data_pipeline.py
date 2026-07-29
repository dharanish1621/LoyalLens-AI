"""
=============================================================================
Data Pipeline: Ingestion, Validation, Rejection Handling & Feature Store
=============================================================================
1. Ingests raw Bronze data logs
2. Validates records & isolates invalid/out-of-range rows to rejected_records.csv
3. Cleans, imputes missing values, and builds Silver 360 customer feature store
4. Encodes categorical variables using LabelEncoder
=============================================================================
"""

import os
import sys
import joblib
import pandas as pd
import numpy as np

PROJECT_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
if PROJECT_ROOT not in sys.path:
    sys.path.insert(0, PROJECT_ROOT)

from sklearn.preprocessing import LabelEncoder
from src.config import (
    RAW_DATA_PATH,
    REJECTED_DATA_PATH,
    TARGET_COLUMN,
    FEATURE_COLUMNS,
    CATEGORICAL_COLUMNS,
    ENCODERS_SAVE_PATH
)

def load_bronze_data(file_path=RAW_DATA_PATH) -> pd.DataFrame:
    """Ingests raw Bronze customer telemetry dataset."""
    if not os.path.exists(file_path):
        raise FileNotFoundError(f"[!] Raw dataset file not found at {file_path}")
    df = pd.read_csv(file_path)
    print(f"[Bronze Layer] Loaded {len(df)} raw customer event records.")
    return df

def validate_and_filter_records(df: pd.DataFrame):
    """Rejection engine: Validates rows and isolates rejected records."""
    df = df.copy()
    valid_mask = pd.Series(True, index=df.index)

    if TARGET_COLUMN in df.columns:
        valid_mask &= df[TARGET_COLUMN].notnull()

    numeric_check_cols = ["Days_Since_Last_Purchase", "Total_Purchases", "Lifetime_Value", "Age"]
    for col in numeric_check_cols:
        if col in df.columns:
            valid_mask &= (df[col].isnull()) | (df[col] >= 0)

    valid_df = df[valid_mask].copy()
    rejected_df = df[~valid_mask].copy()

    if len(rejected_df) > 0:
        rejected_df.to_csv(REJECTED_DATA_PATH, index=False)
        print(f"[Rejection Engine] Filtered out {len(rejected_df)} invalid rows -> Saved to '{REJECTED_DATA_PATH}'")
    else:
        print("[Rejection Engine] All records passed data quality validation.")

    return valid_df

def build_silver_feature_store(df: pd.DataFrame, is_training: bool = True, label_encoders: dict = None):
    """Processes Silver layer 360 view, fills missing values, and encodes features."""
    df = df.copy()
    df.columns = df.columns.str.strip()

    for col in FEATURE_COLUMNS:
        if col not in df.columns:
            df[col] = np.nan

    num_cols = [c for c in FEATURE_COLUMNS if c not in CATEGORICAL_COLUMNS]
    for col in num_cols:
        df[col] = pd.to_numeric(df[col], errors='coerce')
        median_val = df[col].median() if not df[col].dropna().empty else 0
        df[col] = df[col].fillna(median_val)

    for col in CATEGORICAL_COLUMNS:
        df[col] = df[col].astype(str).fillna("Unknown")

    if is_training:
        encoders = {}
        for col in CATEGORICAL_COLUMNS:
            le = LabelEncoder()
            df[col] = le.fit_transform(df[col])
            encoders[col] = le
        joblib.dump(encoders, ENCODERS_SAVE_PATH)
        print(f"[Feature Store] Fitted and saved LabelEncoders to '{ENCODERS_SAVE_PATH}'")
    else:
        encoders = label_encoders or joblib.load(ENCODERS_SAVE_PATH)
        for col in CATEGORICAL_COLUMNS:
            le = encoders[col]
            df[col] = df[col].map(lambda s: le.transform([s])[0] if s in le.classes_ else 0)

    X = df[FEATURE_COLUMNS].copy()
    y = df[TARGET_COLUMN].astype(int).values if TARGET_COLUMN in df.columns else None

    print(f"[Silver Feature Store] Built feature matrix: {X.shape[0]} samples x {X.shape[1]} features.")
    return X, y, encoders

def run_data_pipeline(file_path=RAW_DATA_PATH):
    """Executes the full end-to-end data pipeline."""
    raw_df = load_bronze_data(file_path)
    clean_df = validate_and_filter_records(raw_df)
    X, y, encoders = build_silver_feature_store(clean_df, is_training=True)
    return X, y, clean_df
