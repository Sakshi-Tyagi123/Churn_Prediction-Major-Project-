import pandas as pd
import numpy as np
import joblib
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
from sklearn.ensemble import RandomForestClassifier

# Load dataset
df = pd.read_csv("Telco-Customer-Churn.csv")

# Drop customerID as it's not relevant for training
df.drop(columns=['customerID'], inplace=True, errors='ignore')

# Convert 'TotalCharges' to numeric
df['TotalCharges'] = pd.to_numeric(df['TotalCharges'], errors='coerce')
df['TotalCharges'].fillna(df['TotalCharges'].median(), inplace=True)

# Encode categorical columns using LabelEncoder
encoders = {}
for col in df.select_dtypes(include=['object']).columns:
    le = LabelEncoder()
    df[col] = le.fit_transform(df[col])
    encoders[col] = le  # Save encoders for later

# Save encoders to file
joblib.dump(encoders, "models/encoders.pkl")

# Define features and target variable
X = df.drop(columns=["Churn"])  # Features
y = df["Churn"]  # Target

# Split dataset into train and test sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train a model (RandomForestClassifier)
model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

# Save trained model
joblib.dump(model, "models/model.pkl")

print("✅ Model and encoders saved successfully in 'models/' folder!")
