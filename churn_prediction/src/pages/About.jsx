import React from "react";
import "../styles/About.css";
import churnImage from "../assets/about.png"; // Ensure this image exists
import { FaLinkedin } from "react-icons/fa"; // Import LinkedIn icon
import krishnaImage from "../assets/krishna.png"; // Ensure this image exists
import sakshiImage from "../assets/Sakshi.png"; // Ensure this image exists

const About = () => {
  return (
    <div className="about-container">
      {/* Header Section */}
      <div className="about-header">
        <h1>Predicting Customer Churn with AI</h1>
        <p>
          Unlock the power of data-driven insights to improve customer retention
          and business growth.
        </p>
      </div>

      {/* Content Section */}
      <div className="about-content">
        <div className="about-text">
          <h2>Our Mission</h2>
          <p>
            Our goal is to help businesses reduce customer churn by leveraging
            machine learning models that provide accurate and actionable insights.
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

      {/* Meet the Team Section */}
      <div className="team-section">
        <h2>Meet the Team</h2>
        <div className="team-members">
          <div className="team-member">
            <img src={krishnaImage} alt="Krishna" className="team-photo" />
            <h3>👨‍🎨 Krishna</h3>
            <p>UI/UX Designer</p>
            <a href="https://www.linkedin.com/in/krishna-verma-b38a84220/" target="_blank" rel="noopener noreferrer" className="linkedin-link">
              <FaLinkedin /> LinkedIn
            </a>
          </div>
          <div className="team-member">
            <img src={sakshiImage} alt="Sakshi" className="team-photo" />
            <h3>👩‍💻 Sakshi</h3>
            <p>Web Developer</p>
            <a href="https://www.linkedin.com/in/sakshi-tyagi-4a0175262/" target="_blank" rel="noopener noreferrer" className="linkedin-link">
              <FaLinkedin /> LinkedIn
            </a>
          </div>
        </div>
        <p className="documentation">
          📜 Documentation by <b>Krishna & Sakshi</b>
        </p>
      </div>
    </div>
  );
};

export default About;
