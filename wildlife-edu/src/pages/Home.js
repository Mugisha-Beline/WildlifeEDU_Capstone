// src/pages/About.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { db } from './Firebase'; 
import { collection, addDoc } from 'firebase/firestore'; 
import './Home.css';
import './About.css';
import './Contact.css';

const About = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('.about-fade-in-up, .about-fade-in-left, .about-fade-in-right');

      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= window.innerHeight && rect.bottom >= 0) {
          section.classList.add('show');
        } else {
          section.classList.remove('show');
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Email validation helper function
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  // Form validation before submission
  const validateForm = () => {
    if (name.trim().length < 2) {
      setErrorMessage('Name should be at least 2 characters long.');
      return false;
    }
    if (!validateEmail(email)) {
      setErrorMessage('Please enter a valid email address.');
      return false;
    }
    if (message.trim().length < 10) {
      setErrorMessage('Message should be at least 10 characters long.');
      return false;
    }
    return true;
  };

  // Firebase form submission with validation
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(''); // Reset error message before validation

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const contactRef = collection(db, 'contacts');
      await addDoc(contactRef, {
        name,
        email,
        message,
        createdAt: new Date(),
      });

      // Clear form fields and show success message
      setName('');
      setEmail('');
      setMessage('');
      setSuccessMessage('Thank you! Your message has been sent.');
    } catch (error) {
      console.error('Error submitting contact form:', error);
      setErrorMessage('There was an error submitting the form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="Aboutus">
      <div className="about about-fade-in-up">
        <div className="background-section">
          <div className="content">
            <h1>Let’s Care About Our Wildlife Together!</h1>
          </div>
          <Link to="/login" className="cta-button">Upcoming Events</Link>
        </div>
      </div>

      {/* Educational Content Section */}
      <section className="educational-content about-fade-in-up">
        <h2>Study with us at WildlifEDU!</h2>
        <div className="content-cards">
          <Link to="/login" className="content-card about-fade-in-left">
            <img src="/conservation.jpg" alt="Conservation 101" className="card-image" />
            <h3>Conservation 101</h3>
            <p>Learn the basics of wildlife conservation.</p>
          </Link>

          <Link to="/login" className="content-card about-fade-in-up">
            <img src="/technology.jpg" alt="Innovative Technologies" className="card-image" />
            <h3>Innovative Technologies</h3>
            <p>Explore how technology is helping preserve wildlife.</p>
          </Link>

          <Link to="/login" className="content-card about-fade-in-right">
            <img src="/local.jpg" alt="Local Wildlife" className="card-image" />
            <h3>Local Wildlife</h3>
            <p>Discover the wildlife in your area and how to protect it.</p>
          </Link>
        </div>
      </section>

      {/* Contact Section */}
      <section className="contact about-fade-in-up">
        <h2>Let’s Connect With Your Ideas!</h2>
        <div className="contact-content">
          <img src="/contact.jpg" alt="Contact Us" className="contact-image about-fade-in-right" />
          <form onSubmit={handleSubmit}>
            <div className="form-group about-fade-in-up">
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="Enter your name"
                disabled={isSubmitting}
              />
            </div>
            <div className="form-group about-fade-in-up">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Enter your email"
                disabled={isSubmitting}
              />
            </div>
            <div className="form-group about-fade-in-up">
              <label htmlFor="message">Message:</label>
              <textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                placeholder="Type your message here"
                disabled={isSubmitting}
              />
            </div>
            <button type="submit" className="contact-button about-fade-in-up" disabled={isSubmitting}>
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            {successMessage && <p className="success-message">{successMessage}</p>}
          </form>
        </div>
      </section>
    </div>
  );
};

export default About;
