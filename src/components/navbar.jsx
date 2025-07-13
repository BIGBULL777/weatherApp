// src/components/Navbar.jsx
import React from 'react';
// import './Navbar.css'; // We'll create this CSS file next

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <a href="/" className="navbar-logo">Weather</a>
      </div>
      <ul className="navbar-links">
        <li><a href="#about">About</a></li>
        <li><a href="#contact">Contact</a></li>
        {/* Add more links as needed */}
      </ul>
    </nav>
  );
}

export default Navbar;