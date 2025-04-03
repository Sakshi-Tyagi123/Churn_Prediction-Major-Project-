import React, { useState } from "react";
import emailjs from "@emailjs/browser";
import Swal from "sweetalert2"; // Import SweetAlert2
import "../styles/Contact.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const serviceID = "service_j88t6zl";  // Replace with your EmailJS Service ID
    const templateID = "template_uyhw5nj"; // Replace with your EmailJS Template ID
    const userID = "klyimB0xv7DcsuUgQ"; // Replace with your EmailJS Public Key

    const templateParams = {
      name: formData.name,
      email: formData.email,
      message: formData.message,
      title: "Query Related to Churn Prediction", 
      time: new Date().toLocaleString(),
    };

    emailjs
      .send(serviceID, templateID, templateParams, userID)
      .then((response) => {
        // ✅ Show success popup with checkmark
        Swal.fire({
          title: "Success!",
          text: "Your message has been sent successfully!",
          icon: "success",
          confirmButtonColor: "#007bff",
        });

        // Reset form fields
        setFormData({ name: "", email: "", message: "" });
      })
      .catch((error) => {
        // ❌ Show error popup with warning icon
        Swal.fire({
          title: "Error!",
          text: "Failed to send message. Please try again.",
          icon: "error",
          confirmButtonColor: "#d33",
        });

        console.error("EmailJS Error:", error);
      });
  };

  return (
    <div className="contact-container">
      <h2>Contact Us</h2>
      <p>Have any questions? Feel free to reach out!</p>
      <form onSubmit={handleSubmit} className="contact-form">
        <div className="input-group">
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-group">
          <label>Message</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="submit-btn">Send Message</button>
      </form>

      {/* Contact Details */}
      <div className="contact-info">
        <p>📞 <strong>Call us:</strong> +91 8053054740</p>
        <a 
          href="https://wa.me/918053054740?text=Hello,%20I%20have%20a%20query%20regarding%20Churn%20Prediction." 
          target="_blank" 
          rel="noopener noreferrer"
          className="whatsapp-btn"
        >
          📩 Chat on WhatsApp
        </a>
      </div>
    </div>
  );
};

export default Contact;
