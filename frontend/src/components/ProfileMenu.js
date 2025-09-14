import React from 'react';
import { Menu, MenuItem, ListItemIcon, ListItemText, Divider } from '@mui/material';
import { AccountCircle, Brightness4, Settings, Logout, AdminPanelSettings } from '@mui/icons-material'; // Import the Admin icon
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

const ProfileMenu = ({ anchorEl, open, onClose }) => {
  const navigate = useNavigate();
  const { user, logout } = useAuth(); // Get the full user object from context
  const { toggleTheme } = useTheme();

  const handleNavigate = (path) => {
    navigate(path);
    onClose();
  };
  
  const handleLogout = () => {
    logout();
    onClose();
    navigate('/signin');
  };

  const handleThemeToggle = () => {
    toggleTheme();
    onClose();
  };

  return (
    <Menu anchorEl={anchorEl} open={open} onClose={onClose}>
      
      {/* ✅ THIS IS THE CRITICAL PART */}
      {/* Conditionally render the Admin Dashboard link if the user's role is 'admin' */}
      {user && user.role === 'admin' && (
        <MenuItem onClick={() => handleNavigate('/admin')}>
          <ListItemIcon><AdminPanelSettings fontSize="small" /></ListItemIcon>
          <ListItemText>Admin Dashboard</ListItemText>
        </MenuItem>
      )}

      <MenuItem onClick={() => handleNavigate('/profile')}>
        <ListItemIcon><AccountCircle fontSize="small" /></ListItemIcon>
        <ListItemText>Profile</ListItemText>
      </MenuItem>
      <MenuItem onClick={handleThemeToggle}>
        <ListItemIcon><Brightness4 fontSize="small" /></ListItemIcon>
        <ListItemText>Theme</ListItemText>
      </MenuItem>
      <MenuItem onClick={() => handleNavigate('/settings')}>
        <ListItemIcon><Settings fontSize="small" /></ListItemIcon>
        <ListItemText>Settings</ListItemText>
      </MenuItem>
      <Divider />
      <MenuItem onClick={handleLogout}>
        <ListItemIcon><Logout fontSize="small" /></ListItemIcon>
        <ListItemText>Sign Out</ListItemText>
      </MenuItem>
    </Menu>
  );
};

export default ProfileMenu;