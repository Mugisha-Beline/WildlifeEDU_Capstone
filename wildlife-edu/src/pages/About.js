import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
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

      {/* Partnerships Section */}
      <section className="partnerships about-fade-in-left">
        <h2>Our Partnerships</h2>
        <p>Collaborating with like-minded organizations to make a difference.</p>
        <div className="partners">
          <div className="partner">
            <img src="/partner1.jpg" alt="Partner 1" />
            <a href="https://www.newworldencyclopedia.org/entry/Dian_Fossey" className="read-more" target="_blank" rel="noopener noreferrer">Diana Fossey</a>
          </div>
          <div className="partner">
            <img src="/partner2.jpg" alt="Partner 2" />
            <a href="https://rdb.rw/" className="read-more" target="_blank" rel="noopener noreferrer">RDB</a>
          </div>
          {/* Add more partner elements as needed */}
        </div>
      </section>

      {/* Blogs Section */}
      <section className="blogs about-fade-in-right">
        <h2>Our Blog</h2>
        <p>Stay updated with our latest posts and wildlife stories.</p>
        <div className="blog-posts">
          <div className="blog-post">
            <img src="/blog1.jpg" alt="Blog Post 1" />
            <h3>Blog Post Title 1</h3>
            <p>Lions and their little ones...</p>
            <Link to="/blog/1" className="read-more">Read More</Link>
          </div>
          <div className="blog-post">
            <img src="/blog2.jpg" alt="Blog Post 2" />
            <h3>Blog Post Title 2</h3>
            <p>Birds in Akagera National Park...</p>
            <Link to="/blog/2" className="read-more">Read More</Link>
          </div>
          {/* Add more blog post elements as needed */}
        </div>
      </section>
    </div>
  );
};

export default About;
