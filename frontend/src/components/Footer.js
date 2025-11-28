import React from "react";
import { Link } from "react-scroll";

import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
  FaEnvelope,
  FaPhoneAlt,
} from "react-icons/fa";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">

        {/* Left Section */}
        <div className="footer-section about">
          <h2>RBR Events</h2>
          <p>
            Transforming spaces into unforgettable experiences. <br/>
            From weddings to corporate events, <br/> we make every occasion magical.
          </p>
        </div>

        {/* Quick Links */}
        <div className="footer-section links">
          <h3>Quick Links</h3>
          <ul>
            <Link to="home" smooth={true} duration={600}>Home</Link>
            <Link to="services" smooth={true} duration={600}>services</Link>
            <Link to="gallery" smooth={true} duration={600}>gallery</Link>
            <Link to="about" smooth={true} duration={600}>about</Link>
            <Link to="contact" smooth={true} duration={600}>contact</Link>
            
          
          </ul>
        </div>

        {/* Contact Section */}
        <div className="footer-section contact">
          <h3>Contact Us</h3>

         <p>
  <FaEnvelope className="icon" />
  <a
    href="mailto:rangbirangirasmein@gmail.com"
    target="_blank"
    rel="noreferrer"
    onClick={(e) => e.stopPropagation()}
  >
    rangbirangirasmein@gmail.com
  </a>
</p>


          <p>
            <FaPhoneAlt className="icon" />
            <a
              href="tel:+918502817889"
              onClick={(e) => e.stopPropagation()}
            >
              +91 8502817889
            </a>
          </p>

          <p>📍 Pratap Nagar, Jaipur</p>

          <div className="social-icons">

            {/* Instagram FIXED */}
            <a
              href="https://www.instagram.com/rangbirangirasmein.in"
              target="_blank"
              rel="noreferrer"
              onClick={(e) => e.stopPropagation()}
            >
              <FaInstagram />
            </a>

            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noreferrer"
              onClick={(e) => e.stopPropagation()}
            >
              <FaFacebookF />
            </a>

            <a onClick={(e) => e.stopPropagation()} href="#">
              <FaTwitter />
            </a>

            <a onClick={(e) => e.stopPropagation()} href="#">
              <FaLinkedinIn />
            </a>

          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} RBR Events | All Rights Reserved</p>
        <p className="credit">Designed with ❤️ by <span>Sourabh</span></p>
      </div>
    </footer>
  );
}
