// src/pages/PostRegister.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import './PostRegister.css'; // Import the CSS for styling

const PostRegister = () => {
  return (
    <div className="post-registerpage">
      <div className="registered">
        <div className="post-register-container">
          <h2>Welcome to WildlifEDU!</h2>
          <p>Registered successfully!</p>
          <p>Congratulations <span role="img" aria-label="celebration">🎉</span></p>
          <div className="post-register-actions">
            <Link to="/courses" className="post-register-button">Explore Courses</Link>
            <Link to="/forum" className="post-register-button">Join Forum</Link>
            <Link to="/all-events" className="post-register-button">View All Events</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostRegister;
