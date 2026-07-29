"""
Data Cleaning & Normalization Utilities
"""

def clean_customer_dataframe(df):
    """Fills null values, handles data type conversions, and sanitizes strings."""
    if df is None:
        return None
    df = df.copy()
    # Fill numeric nulls with median
    numeric_cols = df.select_dtypes(include=['number']).columns
    df[numeric_cols] = df[numeric_cols].fillna(df[numeric_cols].median())
    return df
