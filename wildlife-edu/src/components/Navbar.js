import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate for programmatic navigation
import './Navbar.css'; 

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate(); // Initialize navigate hook

  // Toggle the menu on small screens
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // Handle search input change
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Map search terms to courses
  const courseMap = {
    'conservation': '/course1',
    'birds': '/course2',
    'reptiles': '/course3',
    'marine': '/course4',
    // Add more terms and course routes as needed
  };

  // Handle search submission
  const handleSearchSubmit = (event) => {
    event.preventDefault();

    // Check if there's a matching course route
    const courseRoute = Object.keys(courseMap).find(term => 
      searchTerm.toLowerCase().includes(term)
    );

    if (courseRoute) {
      navigate(courseMap[courseRoute]); // Navigate to the matched course
    } else {
      alert('No matching course found for your search.'); // Alert if no match found
    }

    setSearchTerm(''); // Clear the search input after submission
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
          <span className="menu-icon">&#9776;</span>
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
