import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Box, CircularProgress } from '@mui/material';

const HostRoute = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
        <CircularProgress />
      </Box>
    );
  }

  // If user is authenticated and has the 'host' role, allow access.
  // Otherwise, redirect them to the 'Become a Host' page.
  return user && user.role === 'host' ? <Outlet /> : <Navigate to="/become-a-host" />;
};

export default HostRoute;