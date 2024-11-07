import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import './Courses.css';
import { getAllCourses, getUserCourses } from '../components/utils/api';

const Courses = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [courses, setCourses] = useState([]);
  const [userCourses, setUserCourses] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false); // Toggle for mobile

  const sampleCourses = [
    {
      id: 1,
      title: 'Conservation 101',
      description: 'Learn the basics of wildlife conservation.',
      image: '/conservation.jpg',
    },
    {
      id: 2,
      title: 'Innovative Technologies',
      description: 'Explore how technology is helping preserve wildlife.',
      image: '/technology.jpg',
    },
    {
      id: 3,
      title: 'Local Wildlife',
      description: 'Discover the wildlife in your area and how to protect it.',
      image: '/local.jpg',
    },
    {
      id: 4,
      title: 'Sustainable Practices',
      description: 'Understand sustainable practices for wildlife protection.',
      image: '/sustainable.jpg',
    },
    {
      id: 5,
      title: 'Ecological Footprints',
      description: 'Learn about ecological footprints and their impacts.',
      image: '/ecological.jpg',
    },
  ];

  useEffect(() => {
    getAllCourses()
      .then(data => {
        setCourses(data.courses.length ? data.courses : sampleCourses);
      })
      .catch(() => {
        setCourses(sampleCourses);
      });

    getUserCourses().then(data => setUserCourses(data.user_courses));
  }, []);

  const getFilteredCourses = () => {
    if (activeTab === 'unstarted') return courses;
    if (activeTab === 'ongoing') return userCourses.filter(c => c.progress < 100);
    if (activeTab === 'finished') return userCourses.filter(c => c.progress === 100);
    if (activeTab === 'all') return courses.filter(c => !userCourses.some(uc => uc.course === c.title));
    return [];
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen); // Toggle the menu state
  };

  const handleMenuClick = (tab) => {
    setActiveTab(tab);
    setMenuOpen(false); // Close menu after clicking an option
  };

  return (
    <div className="courses-page">
      {/* Main Navbar */}
      <nav className="main-navbar">
        <h1>WildlifEDU Courses</h1>
        {/* Hamburger Menu Icon */}
        <div className="hamburger-menu" onClick={toggleMenu}>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </nav>

      {/* Horizontal Navigation Bar */}
      <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
        <ul>
          <li onClick={() => handleMenuClick('all')} className={activeTab === 'all' ? 'active' : ''}>
            All Courses
          </li>
          <li onClick={() => handleMenuClick('ongoing')} className={activeTab === 'ongoing' ? 'active' : ''}>
            Ongoing Courses
          </li>
          <li onClick={() => handleMenuClick('finished')} className={activeTab === 'finished' ? 'active' : ''}>
            Finished Courses
          </li>
          <li onClick={() => handleMenuClick('unstarted')} className={activeTab === 'unstarted' ? 'active' : ''}>
            Unstarted Courses
          </li>
        </ul>
        <ul>
          <Link to="/settings" className="cta-button">Settings</Link>
        </ul>
      </div>

      <main className="courses-content">
        <header className="courses-header">
            <h1>{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Courses</h1>
        </header>

        <div className="courses-grid">
            {getFilteredCourses().map(course => (
                <div key={course.id || course.course} className="course-card">
                    <img src={course.image} alt={course.title} className="course-image" />
                    
                    {/* Link to Course Folder */}
                    <Link to={`/course1`} className="course-title">
                        <h2>{course.title}</h2>
                    </Link>
                    
                    <p className="course-description">{course.description}</p>
                    
                    {/* Direct "View Course" to the Course's Main File */}
                    <Link to={`/course2`} className="view-course-button">View Course</Link>
                    
                    {/* Display Progress if Available */}
                    {userCourses.some(uc => uc.course === course.title) && (
                        <p>Progress: {userCourses.find(uc => uc.course === course.title).progress}%</p>
                    )}
                </div>
            ))}
        </div>
    </main>
    </div>
  );
};

export default Courses;
