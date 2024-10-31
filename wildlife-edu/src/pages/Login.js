// src/pages/Login.js
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import { login } from './Firebase'; 
import './Home.css';
import './Login.css'; 

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); // State for error messages
  const [successMessage, setSuccessMessage] = useState(''); // State for success messages
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage(''); // Reset error message before trying to log in
    setSuccessMessage(''); // Reset success message

    // Validate email format
    if (!/\S+@\S+\.\S+/.test(email)) {
      setErrorMessage("Please enter a valid email address."); // Invalid email format
      return;
    }

    try {
      await login(email, password);
      setSuccessMessage("You have logged in successfully!"); // Set success message
      navigate('/post-register'); // Navigate after a successful login
    } catch (error) {
      // Handle specific error codes
      switch (error.code) {
        case 'auth/user-not-found':
          setErrorMessage("User not found. Please register before logging in."); // User does not exist
          break;
        case 'auth/wrong-password':
          setErrorMessage("Incorrect username or password. Please try again."); // Wrong password
          break;
        case 'auth/invalid-credential':
          setErrorMessage("Invalid email or password format. Please check your credentials."); // Invalid credentials
          break;
        default:
          setErrorMessage(error.message); // Generic error message for other errors
      }
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const elements = document.querySelectorAll('.login, .form-group, .login-button');
      elements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight) {
          el.classList.add('show'); 
        } else {
          el.classList.remove('show');
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="loginpage">
      <div className="login-container">
        <div className="login fade-in-up">
          <form onSubmit={handleLogin} className="login-form">
            <h2>Login to Your Account</h2>
            <div className="form-group fade-in-up">
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
            <div className="form-group fade-in-up">
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Enter your password"
              />
            </div>
            <center>
              <button type="submit" className="cta-button">Login</button>
            </center>
            {errorMessage && <p className="error-message">{errorMessage}</p>} {/* Display error message */}
            {successMessage && <p className="success-message">{successMessage}</p>} {/* Display success message */}
            <p className="p">
              Don't have an account? <Link to="/signup">Sign up here</Link>
            </p>
          </form>

          <div className="login-image">
            <img src="/giraffe.jpg" alt="Login Illustration" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
