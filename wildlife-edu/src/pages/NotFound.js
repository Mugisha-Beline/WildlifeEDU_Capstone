// src/pages/NotFound.js
import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import './Home.css'; 
import './NotFound.css'; // Optional: Import any specific CSS for styling

const NotFound = () => {
  return (
    <div>
    <div className="not-found">
      <h1>404</h1>
      <h2>Page Not Found</h2>
      <p>Sorry, the page you are looking for does not exist.</p>
      <Link to="/" className="home-link">Go to Home Page</Link>
    </div>
      </div>
  );
};

export default NotFound;
