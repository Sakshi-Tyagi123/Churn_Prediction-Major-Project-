# Churn Prediction

## Overview
Churn Prediction is a machine learning-based approach to identify customers who are likely to leave a service, helping businesses take proactive measures to retain them.

## Features
- Data preprocessing and feature engineering
- Machine learning model training (Random Forest)
- Model evaluation and selection based on performance metrics
- Web application integration for user-friendly predictions using FastAPI

## Dataset
The project utilizes telecom customer data to analyze customer behavior and predict churn. The dataset includes various features like customer tenure, contract type, payment method, and service usage.

## Tech Stack
- **Programming Languages**: Python
- **Libraries**: Pandas, NumPy, Scikit-learn, XGBoost, Matplotlib, Seaborn
- **Web Framework**: FastAPI
- **Frontend**: React (for web integration)
- **Database**: .csv files

  ## Installation
1. Clone the repository:
   ```sh
   git clone https://github.com/Sakshi-Tyagi123/Churn_Prediction-Major-Project-.git
   cd Churn_Prediction-Major-Project-
   ```
2. Install dependencies:
   ```sh
   pip install -r requirements.txt
   ```
3. Run the project:
   ```sh
   uvicorn main:app --reload
   ```
   (or start the web app if integrated)

## Usage
- Train the model using the dataset
- Predict customer churn probability
- Visualize key insights and trends

## Model Performance
Evaluation metrics used:
- Accuracy
- Precision, Recall, F1-score
- ROC-AUC Score

## Future Enhancements
- Enhance model accuracy with hyperparameter tuning
- Deploy the model as a web service
- Implement additional visualization dashboards

## Contributing
Contributions are welcome! Feel free to submit a pull request or open an issue.

## License
This project is open-source and available under the MIT License.

---
### **Author**
Sakshi
