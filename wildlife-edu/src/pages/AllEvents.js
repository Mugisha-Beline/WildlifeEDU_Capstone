// src/pages/AllEvents.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import './AllEvents.css'; // Assuming a new CSS file for this page

const AllEvents = () => {
  return (
    <div className="allevents">
      <div className="all-events">
        <h2>Take part in these exciting events!</h2>

        {/* Event List Section */}
        <div className="events-list">
          {/* Individual Event Items */}
          <Link to="/events/wildlife-conservation-workshop" className="event-item">
            <img src="/wildlife-workshop.jpg" alt="Wildlife Conservation Workshop" className="event-image" />
            <div className="event-details">
              <strong>Wildlife Conservation Workshop</strong>
              <p>Date: October 25, 2024</p>
              <p>Location: Community Center, City Hall</p>
            </div>
          </Link>
          <Link to="/events/wildlife-photography-exhibition" className="event-item">
            <img src="/wildlife-photography.jpg" alt="Wildlife Photography Exhibition" className="event-image" />
            <div className="event-details">
              <strong>Wildlife Photography Exhibition</strong>
              <p>Date: December 1-15, 2024</p>
              <p>Location: City Art Gallery</p>
            </div>
          </Link>
          <Link to="/events/beach-cleanup" className="event-item">
            <img src="/beach-cleanup.jpg" alt="Beach Cleanup Day" className="event-image" />
            <div className="event-details">
              <strong>Beach Cleanup Day</strong>
              <p>Date: November 5, 2024</p>
              <p>Location: Local Beach Park</p>
            </div>
          </Link>

          <Link to="/events/wildlife-photography-exhibition" className="event-item">
            <img src="/wildlife-photography.jpg" alt="Wildlife Photography Exhibition" className="event-image" />
            <div className="event-details">
              <strong>Wildlife Photography Exhibition</strong>
              <p>Date: December 1-15, 2024</p>
              <p>Location: City Art Gallery</p>
            </div>
          </Link>

          <Link to="/events/kwita-izina-day" className="event-item">
            <img src="/kwita-izina.jpg" alt="Kwita Izina Day" className="event-image" />
            <div className="event-details">
              <strong>Kwita Izina Day</strong>
              <p>Date: November 29, 2024</p>
              <p>Location: Volcano National Park</p>
            </div>
          </Link>

          <Link to="/events/wildlife-conservation-workshop" className="event-item">
            <img src="/wildlife-workshop.jpg" alt="Wildlife Conservation Workshop" className="event-image" />
            <div className="event-details">
              <strong>Wildlife Conservation Workshop</strong>
              <p>Date: October 25, 2024</p>
              <p>Location: Community Center, City Hall</p>
            </div>
          </Link>
          {/* Add more event items here */}
        </div>

        {/* Back to Home Button */}
        <Link to="/" className="back-button">Back to Home</Link>
      </div>
    </div>
  );
};

export default AllEvents;
