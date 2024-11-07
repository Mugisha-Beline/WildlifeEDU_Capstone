// Footer.js

import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer about-fade-in-up" style={{ backgroundColor: '#181414', color: 'white' }}>
      <div className="footer-content">
        <div className="footer-logo">
          <img src="/WildlifeEduLogo.jpg" alt="Wildlife EDU Logo" className="footer-logo-image" />
        </div>
        <div className="footer-links">
          <Link to="/donate">Do you want to support us?</Link>
          <Link to="/privacy">Privacy Policy</Link>
          <Link to="/terms">Terms of Service</Link>
        </div>
        <div className="social-media">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <img src="/facebook.jpg" alt="Facebook" className="social-icon" />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <img src="/twitter.jpg" alt="Twitter" className="social-icon" />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <img src="/instagram.jpg" alt="Instagram" className="social-icon" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
