import React from "react";
import "../styles/About.css";
import churnImage from "../assets/analyse.png"; // Make sure you have an image

const About = () => {
  return (
    <div className="about-container">
      <div className="about-header">
        <h1>Predicting Customer Churn with AI</h1>
        <p>
          Unlock the power of data-driven insights to improve customer retention
          and business growth.
        </p>
      </div>

      <div className="about-content">
        <div className="about-text">
          <h2>Our Mission</h2>
          <p>
            Our goal is to help businesses reduce customer churn by leveraging
            machine learning models that provide accurate and actionable
            insights.
          </p>

          <h2>How It Works</h2>
          <ul>
            <li>📊 Analyzes customer behavior using past interactions</li>
            <li>🤖 Uses AI models like Random Forest, XGBoost & Decision Trees</li>
            <li>📈 Provides early warnings and actionable insights</li>
            <li>⚡ Helps businesses make data-driven decisions</li>
          </ul>

          <h2>Why Choose Us?</h2>
          <div className="features">
            <div className="feature-box">🚀 High Accuracy Predictions</div>
            <div className="feature-box">📡 Real-time Analytics</div>
            <div className="feature-box">🎯 Data-Driven Insights</div>
            <div className="feature-box">🔍 Easy-to-Use Dashboard</div>
          </div>
        </div>

        <div className="about-image">
          <img src={churnImage} alt="Churn Analytics" />
        </div>
      </div>
    </div>
  );
};

export default About;
