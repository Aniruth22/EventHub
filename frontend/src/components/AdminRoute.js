import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Box, CircularProgress } from '@mui/material';

const AdminRoute = () => {
  const { user, loading } = useAuth();

  // Show a loading spinner while authentication status is being checked
  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
        <CircularProgress />
      </Box>
    );
  }

  // If the user is authenticated and their role is 'admin', allow access
  // to the nested routes (like the dashboard). Otherwise, redirect to the homepage.
  return user && user.role === 'admin' ? <Outlet /> : <Navigate to="/" />;
};

export default AdminRoute;