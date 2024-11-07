// src/pages/About.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { db } from './Firebase'; 
import { collection, addDoc } from 'firebase/firestore'; 
import './About.css';
import './Contact.css';

const About = () => {
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

  return (
    <div className="Aboutus">
      <div className="about about-fade-in-up">
        <div>
          <h1>About Us</h1>
          <p className='p'>
            Endangered Animals in Rwanda’s Akagera National Park is the particular focus of the study, and it will be undertaken in partnership with local communities, nature care organizations, as well as experts.
          </p>
        </div>
        <img src="/elephants.jpg" alt="Mission" />
        <div className="about-images">
          <div className="about-image about-fade-in-left">
            <h1>Our Mission</h1>
            <p className='p'>We believe that education is the key to fostering a deeper understanding of wildlife.</p>
            <img src="/zebra.jpg" alt="Mission" />
          </div>
          <div className="about-image about-fade-in-right">
            <h1>Our Vision</h1>
            <p className='p'>Join our community today and start your journey toward making a difference!</p>
            <img src="/elephants.jpg" alt="Vision" />
          </div>
        </div>
      </div> 
      {/* Call to Action Section */}
      <section className="call-to-action about-fade-in-up">
        <h2>Join Our Community</h2>
        <p>Engage with other wildlife enthusiasts and experts.</p>
        <Link to="/login" className="cta-button">Join the Forum</Link>
      </section>
    </div>
  );
};

export default About;
