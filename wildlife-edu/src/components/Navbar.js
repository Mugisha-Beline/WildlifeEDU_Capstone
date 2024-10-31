import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; 

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState(''); // State to hold search input

  // Toggle the menu on small screens
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // Handle search input change
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Handle search submission
  const handleSearchSubmit = (event) => {
    event.preventDefault(); // Prevent default form submission
    if (searchTerm.trim()) {
      const searchUrl = `https://www.google.com/search?q=wildlife+${encodeURIComponent(searchTerm)}`;
      window.open(searchUrl, '_blank'); // Open in a new tab
      setSearchTerm(''); // Clear the search input after submission
    }
  };

  return (
    <div>
      <nav className="navbar">
        <div className="navbar-logo">
          <img src="/WildlifeEduLogo.jpg" alt="Wildlife EDU Logo" />
        </div>

        {/* Search box with button */}
        <form onSubmit={handleSearchSubmit} className="search-form">
          <input 
            type="text" 
            placeholder="Search Wildlife Terms..." 
            className="search-box" 
            value={searchTerm} 
            onChange={handleSearchChange} 
          />
          <button type="submit" className="search-button">Search</button>
        </form>

        {/* Menu toggle button for small screens */}
        <div className="menu-toggle" onClick={toggleMenu}>
          <span className="menu-icon">&#9776;</span> {/* Hamburger icon */}
        </div>

        {/* Navbar links */}
        <ul className={`navbar-links ${menuOpen ? 'open' : ''}`}>
        <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About Us</Link></li>
          <li><Link to="/login">Login/Signup</Link></li>
          <li><Link to="/forum-events">Forum + Events</Link></li>
          <li><Link to="/payment" className="donate-button">Donate</Link></li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
