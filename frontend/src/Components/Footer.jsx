import React from "react";
import { motion } from "framer-motion";
import "../Styles/Footer.css";

const Footer = () => {
  return (
    <footer className="footer-hospital">
      <div className="footer-container">
        {/* Top Grid Section */}
        <div className="footer-grid">
          {/* 🏥 Hospital Info */}
          <motion.div
            className="footer-section info"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="footer-logo">🏥 MediCare Hospital</h2>
            <p className="footer-tagline">
              Your Health, Our Priority — 24/7 Emergency Care
            </p>

            <div className="footer-contact">
              <p>📍 123 Medical Plaza, Anna Nagar, Chennai - 600040</p>
              <p>📞 +91 98765 43210</p>
              <p>✉️ info@medicarehospital.com</p>
            </div>

            <div className="footer-certifications">
              <span>NABH Accredited</span>
              <span>ISO Certified</span>
            </div>
          </motion.div>

          {/* 🩺 Quick Links */}
          <motion.div
            className="footer-section links"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h3>🩺 Quick Links</h3>
            <ul>
              <li><a href="#">About Hospital</a></li>
              <li><a href="#">Our Doctors</a></li>
              <li><a href="#">Departments</a></li>
              <li><a href="#">Book Appointment</a></li>
              <li><a href="#">Health Packages</a></li>
              <li><a href="#">Contact Us</a></li>
            </ul>
          </motion.div>

          {/* 🕒 Timings */}
          <motion.div
            className="footer-section timings"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <h3>🕒 Hospital Timings</h3>
            <ul>
              <li><span>Mon - Fri</span> <span>8:00 AM - 8:00 PM</span></li>
              <li><span>Saturday</span> <span>9:00 AM - 6:00 PM</span></li>
              <li><span>Sunday</span> <span>10:00 AM - 4:00 PM</span></li>
              <li className="emergency"><span>Emergency</span> <span>24/7 Available</span></li>
            </ul>
          </motion.div>

          {/* 🌐 Social */}
          <motion.div
            className="footer-section social"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h3>🌐 Connect With Us</h3>
            <div className="social-links">
              <a href="#">Facebook</a>
              <a href="#">Instagram</a>
              <a href="#">Twitter</a>
              <a href="#">LinkedIn</a>
            </div>
          </motion.div>
        </div>

        {/* Divider */}
        <hr className="footer-divider" />

        {/* Bottom Section */}
        <div className="footer-bottom">
          <p>
            © 2025 MediCare Hospital. All rights reserved. &nbsp;|&nbsp; Privacy Policy &nbsp;|&nbsp; Terms & Conditions
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
