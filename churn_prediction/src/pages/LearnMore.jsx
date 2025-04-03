import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/LearnMore.css";

const LearnMore = () => {
  const navigate = useNavigate();
  const [openSection, setOpenSection] = useState(null);

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <div className="learn-more-container">
      <h1 className="title">📊 Learn More About Customer Churn Prediction</h1>

      {/* Sections */}
      {[
        {
          title: "🔍 What is Customer Churn Prediction?",
          content:
            "Customer Churn Prediction helps businesses identify customers who are likely to leave their service. Using machine learning models, companies can take proactive steps to retain valuable customers.",
        },
        {
          title: "⚙️ Features & Functionality",
          content: (
            <ul>
              <li>📁 Upload Dataset</li>
              <li>📊 Predict Customer Churn</li>
              <li>📈 Data Visualization (Graphs & Charts)</li>
              <li>🔍 Identify Key Churn Factors</li>
              <li>📜 Download Detailed Report</li>
              <li>💡 Get Recommendations to Reduce Churn</li>
            </ul>
          ),
        },
        {
          title: "🛠️ Technologies Used",
          content: (
            <ul>
              <li><b>Frontend:</b> React.js</li>
              <li><b>Backend:</b> Node.js / Flask</li>
              <li><b>Machine Learning:</b> Random Forest, XGBoost</li>
              <li><b>Database:</b> MongoDB / MySQL</li>
              <li><b>Deployment:</b> AWS / Heroku</li>
            </ul>
          ),
        },
        {
          title: "🚀 How It Works?",
          content: (
            <ol>
              <li>📊 Data Collection & Preprocessing</li>
              <li>🤖 Train Machine Learning Models</li>
              <li>🔮 Predict Customer Churn</li>
              <li>📉 Show Results Using Graphs & Insights</li>
              <li>💡 Provide Recommendations for Retention</li>
            </ol>
          ),
        },
        {
          title: "🏆 Real-World Use Cases",
          content:
            "Churn prediction is used in Telecom, Banking, and Subscription-based industries. Companies reduce revenue loss by identifying customers at risk and offering personalized retention strategies.",
        },
      ].map((section, index) => (
        <div key={index} className="section">
          <button className={`section-title ${openSection === index ? "active" : ""}`} onClick={() => toggleSection(index)}>
            {section.title}
            <span className="arrow">{openSection === index ? "▲" : "▼"}</span>
          </button>
          <div className={`section-content ${openSection === index ? "open" : ""}`}>
            {section.content}
          </div>
        </div>
      ))}

      {/* Back Button */}
      <button onClick={() => navigate(-1)} className="back-button">🔙 Back</button>
    </div>
  );
};

export default LearnMore;
