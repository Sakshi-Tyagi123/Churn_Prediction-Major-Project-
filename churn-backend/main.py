import sys
import os
sys.path.append(os.path.dirname(os.path.abspath(__file__)))


from fastapi import FastAPI
from api import predict_churn

app = FastAPI()

# Include the prediction endpoint
app.add_api_route("/predict/", predict_churn, methods=["POST"])

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000, reload=True)
