import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';
import './HeroSection.css'; 

const HeroSection = () => {
  return (
    <section className="hero-section">
      <div className="hero-content">
        <h1>Discover Amazing <br /> <span>Events</span></h1>
        <p>Connect with your community through unforgettable experiences. <br /> From concerts to conferences, find your perfect event.</p>
        <div className="hero-buttons">
          <Link to="/events" className="btn btn-primary">
            Explore Events <FaArrowRight style={{ marginLeft: '10px' }} />
          </Link>
          {/* ✅ UPDATED: Changed link from "/signup" to "/list-event" */}
          <Link to="/list-event" className="btn btn-secondary">
            Join EventHub
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;