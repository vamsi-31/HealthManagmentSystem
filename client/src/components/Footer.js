import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-main">
          <div className="footer-section">
            <h3>HealthCare Management System</h3>
            <p>Providing quality healthcare solutions since 2023</p>
            <p className="copyright">&copy; {currentYear} All rights reserved.</p>
          </div>
          
          <div className="footer-section">
            <h3>Quick Links</h3>
            <ul className="footer-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/services">Services</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h3>Legal</h3>
            <ul className="footer-links">
              <li><Link to="/privacy">Privacy Policy</Link></li>
              <li><Link to="/terms">Terms of Service</Link></li>
              <li><Link to="/disclaimer">Disclaimer</Link></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h3>Contact Us</h3>
            <address>
              <p>Email: <a href="mailto:info@healthcaremgmt.com">info@healthcaremgmt.com</a></p>
              <p>Phone: <a href="tel:+11234567890">(123) 456-7890</a></p>
              <p>123 Medical Plaza, Healthcare City</p>
            </address>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>Made with care for healthcare professionals and patients</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;