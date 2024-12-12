// Footer.js
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';
import './Footer.css'; 

const Footer = () => {
  return (
    <footer className="bg-primary text-white py-5 px-5">
      <div className="container text-center">
        <div className="row">
          <div className="col-md-4 mb-4 contact">
            <h4>Email Us</h4>
            <p>Customer service: multi@gmail.com</p>
            <p>Human resources: multi@gmail.com</p>
            <p>Accounts Department: accounts@multi.com</p>
        
          </div>
          <div className="col-md-4 mb-4">
          <h4>Contact Us</h4>
            <p>Sales: +254 710138769</p>
            <p>Support: +254 710138769</p>
            <p>Finance: +254 710138769</p>
          </div>
          <div className="col-md-4 mb-4">
          <h4>Follow Us</h4>
            <div className="social-icons">
              <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faFacebook} size="2x" className="icon" />
              </a>
              <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faTwitter} size="2x" className="icon" />
              </a>
              <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faInstagram} size="2x" className="icon" />
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-secondary text-center py-2">
        <p className="mb-0" style={{ fontSize: '14px' }}>
          &copy; 2024 Multi Hardware Shop. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;