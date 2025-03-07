// import { useState } from "react";
// import { useNavigate } from "react-router-dom";

// const Upload = ({ setPredictions }) => {
//     const [file, setFile] = useState(null);
//     const [error, setError] = useState("");
//     const [loading, setLoading] = useState(false);
//     const navigate = useNavigate();

//     const handleFileChange = (event) => {
//         setFile(event.target.files[0]);
//         setError(""); // Clear error when user selects a file
//     };

//     const handleUpload = async () => {
//         if (!file) {
//             setError("⚠️ Please select a file before uploading.");
//             return;
//         }

//         const formData = new FormData();
//         formData.append("file", file);

//         setLoading(true);

//         try {
//             const response = await fetch("http://127.0.0.1:8000/predict/", { 
//                 method: "POST",
//                 body: formData,
//             });

//             const data = await response.json();
//             console.log("Response Data:", data); // Log response to debug

//             setLoading(false);

//             if (response.ok) {
//                 // Check if predictions exist in the response
//                 if (data && data.predictions) {
//                     setPredictions(data.predictions);
//                     navigate("/dashboard"); // Redirect to Dashboard after successful upload
//                 } else {
//                     setError("⚠️ No predictions found in the response.");
//                 }
//             } else {
//                 setError(data.error || "Something went wrong. Please try again.");
//             }
//         } catch (error) {
//             setLoading(false);
//             setError("❌ Error uploading file. Check your network connection.");
//         }
//     };

//     return (
//         <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
//             <h2 className="text-3xl font-bold mb-4">Upload CSV for Churn Prediction</h2>
//             <div className="bg-white p-6 rounded-xl shadow-lg flex flex-col items-center">
//                 <input type="file" accept=".csv" onChange={handleFileChange} className="mb-4 border p-2" />
//                 <button
//                     onClick={handleUpload}
//                     className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//                     disabled={loading}
//                 >
//                     {loading ? "Uploading..." : "Upload and Predict"}
//                 </button>

//                 {error && <p className="text-red-500 mt-2">{error}</p>}
//             </div>
//         </div>
//     );
// };

// export default Upload;





import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Upload.css";
import logo from "../assets/logo.png";
import upload from "../assets/upload.png";
import predict from "../assets/predict.png";
import analyse from "../assets/analyse.png";
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from "react-icons/ai";
import { BiLoaderCircle } from "react-icons/bi";

const Upload = ({ setPredictions }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [progress, setProgress] = useState(0);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState(null);
  const [error, setError] = useState("");
  const [waiting, setWaiting] = useState(false);
  const [processing, setProcessing] = useState(false);
  const navigate = useNavigate();

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.name.endsWith(".csv")) {
        setSelectedFile(file);
        setShowPopup(true);
        setUploadStatus(null);
        setError("");
        setWaiting(true); // Show waiting state

        // Wait for 1.5 seconds before starting upload
        setTimeout(() => {
          setWaiting(false);
          startUploadProgress(file);
        }, 1500);
      } else {
        alert("Please upload only .csv files.");
      }
    }
  };

  const startUploadProgress = async (file) => {
    setProgress(0);
    let interval = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress >= 100) {
          clearInterval(interval);
          setProcessing(true);
          uploadFile(file);
          return 100;
        }
        return oldProgress + 10;
      });
    }, 500);
  };

  const uploadFile = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("http://127.0.0.1:8000/predict/", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      setProcessing(false);

      if (response.ok && data.predictions) {
        setUploadStatus("success");
        setPredictions(data.predictions);
      } else {
        setUploadStatus("error");
        setError("No predictions found in the response.");
      }
    } catch (error) {
      setProcessing(false);
      setUploadStatus("error");
      setError("Error uploading file. Check your network connection.");
    }
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setProgress(0);
    setSelectedFile(null);
    setUploadStatus(null);
    setWaiting(false);
    setProcessing(false);
  };

  return (
    <div className="upload-container">
      <div className="logo-container">
        <img src={logo} alt="Logo" className="upload-logo" />
      </div>

      <h2>HOW IT WORKS?</h2>

      <div className="steps">
        <div className="step">
          <img src={upload} alt="Step 1" />
          <p>UPLOAD</p>
        </div>
        <span className="arrow">➜</span>
        <div className="step">
          <img src={predict} alt="Step 2" />
          <p>PREDICT</p>
        </div>
        <span className="arrow">➜</span>
        <div className="step">
          <img src={analyse} alt="Step 3" />
          <p>ANALYZE</p>
        </div>
      </div>

      <input
        type="file"
        id="fileInput"
        accept=".csv"
        style={{ display: "none" }}
        onChange={handleFileChange}
      />

      <button
        className="upload-btn"
        onClick={() => document.getElementById("fileInput").click()}
      >
        UPLOAD FILE
      </button>

      <p className="note">Please upload .csv files only</p>

      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <span className="close-btn" onClick={handleClosePopup}>&times;</span>

            {/* Waiting State */}
            {waiting ? (
              <>
                <h3>Waiting...</h3>
                <BiLoaderCircle className="loading-icon spinning" />
              </>
            ) : uploadStatus === "success" ? (
              <>
                <h3 className="success-text">
                  File Uploaded Successfully <AiOutlineCheckCircle className="big-tick"color="green" />
                </h3>
                <button className="predict-btn" onClick={() => navigate("/result")}>
                  PREDICT
                </button>
              </>
            ) : uploadStatus === "error" ? (
              <>
                <h3 className="error-text">
                  Upload Failed! <AiOutlineCloseCircle color="red" />
                </h3>
                <p className="error-message">{error}</p>
              </>
            ) : (
              <>
                <h3>Uploading the file...</h3>
                <p>{selectedFile ? selectedFile.name : "No file selected"}</p>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: `${progress}%` }}></div>
                </div>
                <p className="progress-text">{progress}%</p>

                {progress === 100 && processing && (
                  <>
                    <h3>Processing...</h3>
                    <BiLoaderCircle className="processing-icon spinning" />
                  </>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Upload;
