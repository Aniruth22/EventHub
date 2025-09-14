import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaSearch, FaBell, FaUserCircle } from 'react-icons/fa';
import { IconButton } from '@mui/material';
import './Navbar.css';
import { useSearch } from '../context/SearchContext';
import { useAuth } from '../context/AuthContext';
import ProfileMenu from './ProfileMenu'; // The dropdown menu component

const Navbar = () => {
  const { searchTerm, setSearchTerm } = useSearch();
  const { isAuthenticated } = useAuth();

  // State to manage the position and visibility of the profile menu
  const [anchorEl, setAnchorEl] = useState(null);
  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar-left">
          <Link to="/" className="navbar-brand">
            <img src="https://placehold.co/40x40/7B4397/white?text=EH" alt="EventHub Logo" className="logo" />
            <span className="brand-text">EventHub</span>
          </Link>
          <ul className="nav-links">
            <li><Link to="/events">Events</Link></li>
            <li><Link to="/live">Live</Link></li>
            <li><Link to="/list-event">List Your Event</Link></li>
          </ul>
        </div>

        <div className="navbar-right">
          <div className="search-box">
            <input
              type="text"
              placeholder="Search events..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="search-icon-btn" disabled><FaSearch /></button>
          </div>

          {isAuthenticated ? (
            <>
              <IconButton className="nav-icon-btn" sx={{ color: 'white' }}>
                <FaBell />
              </IconButton>
              <IconButton
                onClick={handleProfileMenuOpen}
                className="nav-icon-btn"
                sx={{ color: 'white' }}
              >
                <FaUserCircle />
              </IconButton>
            </>
          ) : (
            <>
              <Link to="/signin" className="btn btn-secondary">Sign In</Link>
              <Link to="/signup" className="btn btn-primary">Sign Up</Link>
            </>
          )}
        </div>
      </nav>
      
      <ProfileMenu anchorEl={anchorEl} open={isMenuOpen} onClose={handleMenuClose} />
    </>
  );
};

export default Navbar;