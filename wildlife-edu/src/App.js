// src/App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer'; // Import the Footer component
import Home from './pages/Home';
import About from './pages/About';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ForumEvents from './pages/ForumEvents';
import Forum from './pages/Forum'; 
import AllEvents from './pages/AllEvents'; 
import Donate from './pages/Payment';
import Courses from './pages/Courses';
import PostRegister from './pages/PostRegister';
import NotFound from './pages/NotFound'; 
import Payment from './pages/Donate';
import Settings from './pages/Settings'; 
import Pay from './pages/Pay';

function App() {
  return (
    <Router>
      <div className="app-container"> {/* Added app-container div for flex layout */}
        <Navbar />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forum-events" element={<ForumEvents />} />
            <Route path="/forum" element={<Forum />} />
            <Route path="/all-events" element={<AllEvents />} />
            <Route path="/donate" element={<Donate />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/post-register" element={<PostRegister />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/pay" element={<Pay />} />
            <Route path="*" element={<NotFound />} /> {/* Catch-all for undefined routes */}
          </Routes>
        </div>
        <Footer /> {/* Add the Footer here */}
      </div>
    </Router>
  );
}

export default App;
