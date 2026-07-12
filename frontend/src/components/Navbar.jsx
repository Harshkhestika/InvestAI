import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const controlNavbar = () => {
      if (window.scrollY > lastScrollY && window.scrollY > 80) {
        setShow(false); // Hide on scroll down
      } else {
        setShow(true); // Show on scroll up
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener('scroll', controlNavbar);
    return () => window.removeEventListener('scroll', controlNavbar);
  }, [lastScrollY]);

  return (
    <nav className={`navbar flex-between container ${show ? '' : 'navbar-hidden'}`}>
      <div className="navbar-logo">
        <Link to="/" className="text-gradient">InvestAI</Link>
      </div>
      <ul className="navbar-links flex-center">
        <li><a href="#home">Home</a></li>
        <li><a href="#market">Market News</a></li>
        <li><a href="#features">Features</a></li>
        <li><a href="#how-it-works">How it Works</a></li>
        <li><a href="#faq">FAQ</a></li>
      </ul>
      <div className="navbar-actions">
        <Link to="/login" className="btn-secondary" style={{ marginRight: '10px' }}>Login</Link>
        <Link to="/signup" className="btn-primary">Signup</Link>
      </div>
    </nav>
  );
};

export default Navbar;
