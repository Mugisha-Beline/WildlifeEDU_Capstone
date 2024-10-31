// src/pages/Signup.js
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signUp } from './Firebase';
import './Home.css';
import './Signup.css';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [animate, setAnimate] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); // State for error message

  const navigate = useNavigate();

  useEffect(() => {
    setAnimate(true);
    const timer = setTimeout(() => {
      setAnimate(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleSignup = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match!"); // Set error message
      return;
    }

    try {
      // Call the signUp function from firebase.js
      await signUp(email, password);
      setSuccessMessage("You have registered successfully!"); // Set success message
      setTimeout(() => {
        navigate('/post-register'); // Navigate after a short delay
      }, 2000); // Delay navigation to show the message
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        setErrorMessage("This email is already registered. Please use a different email."); // Handle existing user error
      } else {
        setErrorMessage(error.message); // Handle other errors
      }
    }
  };

  return (
    <div className="signuppage">
      <div className={`sign ${animate ? 'bounce' : ''}`}>
        <div className="signup-container">
          <div className="signup">
            <h2>Register Here!</h2>
            <form onSubmit={handleSignup}>
              <div className="form">
                <label htmlFor="name">Name:</label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  placeholder="Enter your name"
                />
              </div>
              <div className="form">
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="Enter your email"
                />
              </div>
              <div className="form">
                <label htmlFor="password">Password:</label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Create a password"
                />
              </div>
              <div className="form">
                <label htmlFor="confirm-password">Confirm Password:</label>
                <input
                  type="password"
                  id="confirm-password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  placeholder="Confirm your password"
                />
              </div>
              <ul>
                <center>
                  <button type="submit" className="cta-button">Sign Up</button>
                </center>
              </ul>
            </form>
            {successMessage && <p className="success-message">{successMessage}</p>} {/* Display success message */}
            {errorMessage && <p className="error-message">{errorMessage}</p>} {/* Display error message */}
            <p className='p'>
              Already have an account? <Link to="/login">Login here</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
