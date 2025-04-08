import React, { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineCheckCircle } from "react-icons/ai";
import "../styles/Result.css";
import logo from "../assets/logo.png";
import Dashboard from "./Dashboard"; // Import Dashboard

const Result = ({ predictions }) => {
  const navigate = useNavigate();
  const dashboardRef = useRef(null);

  // ✅ Debugging: Check if predictions are coming
  useEffect(() => {
    console.log("Predictions Data in Result.jsx:", predictions);
  }, [predictions]);

  useEffect(() => {
    console.log("Dashboard Ref:", dashboardRef.current);
  }, []);

  return (
    <div className="result-container">
      <div className="logo-container">
        <img src={logo} alt="Logo" className="result-logo" />
      </div>

      <div className="tick-container">
        <AiOutlineCheckCircle className="big-tick" />
      </div>

      <h1 className="completed-text">COMPLETED!</h1>

      <div className="button-container">
        <button className="back-btn" onClick={() => navigate(-1)}>
          Back
        </button>
        <button className="view-btn" onClick={() => navigate("/dashboard")}>
          View Insights
        </button>
      </div>

      {/* Render Dashboard inside Result but hidden for PDF */}
      <div style={{ position: "absolute", left: "-9999px" }} ref={dashboardRef}>
        <Dashboard predictions={predictions} />
      </div>
    </div>
  );
};

export default Result;
