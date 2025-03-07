import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Home.css";
import logo from "../assets/logo.png"; // Import your logo

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <div className="content-box">
        {/* Logo */}
        <img src={logo} alt="Logo" className="home-logo" />

        {/* Welcome Text */}
        <h1>WELCOME ! </h1>

        {/* Buttons */}
        <div className="button-container">
          <button className="btn get-started" onClick={() => navigate("/upload")}>
            GET STARTED
          </button>
          <button className="btn learn-more" onClick={() => navigate("/learn-more")}>
            LEARN MORE
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
