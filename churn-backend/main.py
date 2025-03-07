from fastapi import FastAPI
from api.predict import predict_churn  # Import the function from predict.py

app = FastAPI()

# Include the prediction endpoint
app.add_api_route("/predict/", predict_churn, methods=["POST"])

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000, reload=True)
