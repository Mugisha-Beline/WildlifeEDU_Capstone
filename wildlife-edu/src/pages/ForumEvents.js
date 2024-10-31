// src/pages/ForumEvents.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css'; 
import './ForumEvents.css';

const ForumEvents = () => {
  return (
    <div className="forum-eventspage">
      <div className="forum-events-container">
        <div className="forum-header">
          <h2>Forum & Events</h2>
        </div>
        
        {/* Discussion Forum Section */}
        <div className="forum-section">
          <h3>Discussion Forum</h3>
          <p>Join the conversation about wildlife conservation. Share your thoughts, ask questions, and connect with other community members.</p>

          {/* Chat-Like Forum Topics with Icon */}
          <div className="chat-forum">
            <div className="forum-cards">
              <div className="forum-card">
                <img src="/chat.png" alt="Chat Icon" className="forum-card-icon" />
                <div className="forum-card-content">
                  <h4><Link to="/login">What can we do to protect endangered species?</Link></h4>
                  <p>Discuss strategies to save endangered species and exchange ideas with others.</p>
                </div>
              </div>

              <div className="forum-card">
                <img src="/chat.png" alt="Chat Icon" className="forum-card-icon" />
                <div className="forum-card-content">
                  <h4><Link to="/login">Innovative technologies in wildlife preservation</Link></h4>
                  <p>Explore the latest tech being used to help preserve wildlife globally.</p>
                </div>
              </div>

              <div className="forum-card">
                <img src="/chat.png" alt="Chat Icon" className="forum-card-icon" />
                <div className="forum-card-content">
                  <h4><Link to="/login">Local conservation efforts in our community</Link></h4>
                  <p>Share and learn about the local efforts in conservation happening near you.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Link to Forum Page */}
          <Link to="/login" className="join-forum-button">Join Forum</Link>
        </div>

        {/* Events Section */}
        <div className="events-section">
          <h3>Upcoming Events</h3>
          
          {/* Event Cards with Animations */}
          <div className="event-cards">
            <div className="event-card">
              <img src="/wildlife-workshop.jpg" alt="Wildlife Conservation Workshop" className="event-image" />
              <strong>Wildlife Conservation Workshop</strong>
              <p>Date: October 25, 2024</p>
              <p>Location: Community Center, City Hall</p>
            </div>

            <div className="event-card">
              <img src="/beach-cleanup.jpg" alt="Beach Cleanup Day" className="event-image" />
              <strong>Beach Cleanup Day</strong>
              <p>Date: November 5, 2024</p>
              <p>Location: Local Beach Park</p>
            </div>

            <div className="event-card">
              <img src="/wildlife-photography.jpg" alt="Wildlife Photography Exhibition" className="event-image" />
              <strong>Wildlife Photography Exhibition</strong>
              <p>Date: December 1-15, 2024</p>
              <p>Location: City Art Gallery</p>
            </div>
          </div>

          {/* Link to View All Events Page */}
          <Link to="/login" className="view-events-button">View All Events</Link>
        </div>
      </div>
    </div>
  );
};

export default ForumEvents;
