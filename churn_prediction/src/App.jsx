import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import LearnMore from "./pages/LearnMore";
import Upload from "./pages/Upload";
import Result from "./pages/Result";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Dashboard from "./pages/Dashboard";


function App() {
  const [predictions, setPredictions] = useState([]);  // State to store predictions
  
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/learn-more" element={<LearnMore />} />
        {/* Pass setPredictions to Upload */}
        <Route path="/upload" element={<Upload setPredictions={setPredictions} />} />
        <Route path="/result" element={<Result />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        {/* Pass predictions to Dashboard */}
        <Route path="/dashboard" element={<Dashboard predictions={predictions} />} />
      </Routes>
    </Router>
  );
}

export default App;
