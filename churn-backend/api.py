import pandas as pd
import numpy as np
import joblib 
from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from io import BytesIO

app = FastAPI()

# ✅ Add CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ✅ Load model and encoders
MODEL_PATH = "models/model.pkl"
ENCODERS_PATH = "models/encoders.pkl"

try:
    model = joblib.load(MODEL_PATH)
    encoders = joblib.load(ENCODERS_PATH)
except Exception as e:
    raise RuntimeError(f"Error loading model or encoders: {e}")

# ✅ Function to preprocess input data
def preprocess_data(df):
    df = df.copy()
    df.drop(columns=['customerID'], inplace=True, errors='ignore')

    # Convert TotalCharges to numeric
    df['TotalCharges'] = pd.to_numeric(df['TotalCharges'], errors='coerce')
    df['TotalCharges'].fillna(df['TotalCharges'].median(), inplace=True)

    # Apply encoders
    for col, le in encoders.items():
        if col in df.columns:
            df[col] = df[col].map(lambda x: le.transform([x])[0] if x in le.classes_ else 0)

    return df

# ✅ Home Route
@app.get("/")
def home():
    return {"message": "Welcome to the Churn Prediction API!"}

# ✅ Prediction Route
@app.post("/predict/")
async def predict_churn(file: UploadFile = File(...)):
    try:
        print(f"📂 Received file: {file.filename}")
        contents = await file.read()
        df = pd.read_csv(BytesIO(contents))
        
        print(f"📊 DataFrame Loaded: {df.shape}")

        # Preserve customerID before preprocessing
        customer_ids = df["customerID"] if "customerID" in df.columns else None
        
        # Preserve additional columns
        additional_columns = df.drop(columns=["customerID"], errors='ignore')
        
        # Preprocess data
        df = preprocess_data(df)
        X_input = df.drop(columns=['Churn'], errors='ignore')
        
        print("🚀 Making Predictions...")
        predictions = model.predict(X_input)
        print(f"✅ Predictions Generated: {predictions[:5]}")
        
        df['Churn_Prediction'] = np.where(predictions == 1, 'Yes', 'No')
        
        # Include customerID and additional columns in the response
        result = df[['Churn_Prediction']].copy()
        if customer_ids is not None:
            result.insert(0, "customerID", customer_ids.values)
        
        # Add back additional columns
        result = pd.concat([result, additional_columns], axis=1)
        
        return {"predictions": result.to_dict(orient="records")}
    
    except Exception as e:
        print(f"❌ Error: {e}")
        return {"error": str(e)}
