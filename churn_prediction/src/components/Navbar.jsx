import { Link } from "react-router-dom";
import "../styles/Navbar.css"; // Import CSS file
import homeIcon from "../assets/home.png"; // Import home icon image
import React from "react";


const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="nav-left">
        <Link to="/" className="nav-link">
          <img src={homeIcon} alt="Home" className="home-icon" />
        </Link>
      </div>
      <div className="nav-right">
        <Link to="/about" className="nav-link">About Us</Link>
        <Link to="/contact" className="nav-link">Contact</Link>
      </div>
    </nav>
  );
};

export default Navbar;
