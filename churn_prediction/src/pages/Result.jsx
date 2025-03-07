import React from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineCheckCircle } from "react-icons/ai";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import "../styles/Result.css";
import logo from "../assets/logo.png";

const Result = () => {
  const navigate = useNavigate();

  const downloadReport = () => {
    const dashboardElement = document.getElementById("dashboard");
    if (!dashboardElement) {
      alert("Dashboard content not found!");
      return;
    }
    
    html2canvas(dashboardElement).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const imgWidth = 190; // A4 width in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      pdf.addImage(imgData, "PNG", 10, 10, imgWidth, imgHeight);
      pdf.save("Churn_Prediction_Report.pdf");
    });
  };

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
        <button className="download-btn" onClick={downloadReport}>
          Download Report
        </button>
        <button className="view-btn" onClick={() => navigate("/dashboard")}>
          View Insights
        </button>
      </div>
    </div>
  );
};

export default Result;
