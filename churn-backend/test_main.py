
from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

def test_predict_churn():
    csv_data = (
        "customerID,gender,SeniorCitizen,Partner,Dependents,tenure,PhoneService,MultipleLines,"
        "InternetService,OnlineSecurity,OnlineBackup,DeviceProtection,TechSupport,StreamingTV,"
        "StreamingMovies,Contract,PaperlessBilling,PaymentMethod,MonthlyCharges,TotalCharges\n"
        "0001-ABCD,Female,0,Yes,Yes,1,Yes,No,DSL,No,Yes,No,No,No,No,Month-to-month,Yes,"
        "Electronic check,29.85,29.85"
    )
    files = {"file": ("test.csv", csv_data, "text/csv")}
    response = client.post("/predict/", files=files)

    assert response.status_code == 200
    assert "predictions" in response.json()
