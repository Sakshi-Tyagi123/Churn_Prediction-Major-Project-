import React from "react";
import "../styles/Dashboard.css";
import ChurnGraph from "../pages/ChurnGraph"; // Import Graph Component

const Dashboard = ({ predictions }) => {
  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Churn Prediction Results</h1>

      <div className="dashboard-card">
        <table className="dashboard-table">
          <thead>
            <tr>
              <th>Customer ID</th>  {/* Updated column name */}
              <th>Churn Prediction</th>
            </tr>
          </thead>
          <tbody>
            {predictions.length > 0 ? (
              predictions.map((item, index) => (
                <tr key={index}>
                  <td>{item.customerID || "Unknown"}</td> {/* Display Customer ID */}
                  <td className={item.Churn_Prediction === "Yes" ? "text-red" : "text-green"}>
                    {item.Churn_Prediction}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="2" className="no-predictions">No Predictions Available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Add Churn Graph Component Here */}
      <ChurnGraph data={predictions} />
    </div>
  );
};

export default Dashboard;
