import React, { useState } from "react";
import { Link } from "react-scroll";
import Home from "../pages/Home";
import Services from "../pages/Services";
import Gallery from "../pages/Gallery";
import About from "../pages/About";
import Contact from "../pages/Contact";
import Dashboard from "../pages/Dashboard";
import "./Navbar.css";
import { FaBars, FaTimes } from "react-icons/fa";
import logo from "../assets/rbr-logo.png";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="navbar-wrapper">
      {/* Navbar */}
      <nav className="navbar">
        <div className="logo-area">
          <img src={logo} alt="RBR Events" className="logo-img" />
          <h2 className="logo-text">RBR Events</h2>
        </div>

        {/* Links */}
        <div className={`nav-links ${menuOpen ? "open" : ""}`}>
          <Link to="home" smooth duration={500} offset={-70} onClick={closeMenu}>
            Home
          </Link>
          <Link to="services" smooth duration={500} offset={-70} onClick={closeMenu}>
            Services
          </Link>
          <Link to="gallery" smooth duration={500} offset={-70} onClick={closeMenu}>
            Gallery
          </Link>
          <Link to="about" smooth duration={500} offset={-70} onClick={closeMenu}>
            About
          </Link>
          <Link to="contact" smooth duration={500} offset={-70} onClick={closeMenu}>
            Contact
          </Link>
          <Link to="dashboard" smooth duration={500} offset={-70} onClick={closeMenu}>
            Dashboard
          </Link>
          {/* <a href="/login" onClick={closeMenu}>Admin</a> */}
        </div>

        {/* Menu Icon (mobile) */}
        <div className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <FaTimes /> : <FaBars />}
        </div>
      </nav>

      {/* Sections */}
      <section id="home"><Home /></section>
      <section id="services"><Services /></section>
      <section id="gallery"><Gallery /></section>
      <section id="about"><About /></section>
      <section id="contact"><Contact /></section>
      <section id="dashboard"><Dashboard /></section>
    </div>
  );
}
