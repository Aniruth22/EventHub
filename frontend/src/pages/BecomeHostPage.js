import React, { useState } from 'react';
import { Container, Paper, Typography, Box, Button, CircularProgress, Alert } from '@mui/material';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const BecomeHostPage = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleRequest = async () => {
    setLoading(true);
    setMessage('');
    try {
      const res = await axios.post('http://localhost:5001/api/users/request-host');
      setMessage(res.data.msg);
    } catch (err) {
      setMessage('An error occurred. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container sx={{ py: 6 }} maxWidth="md">
      <Paper sx={{ p: 4, textAlign: 'center' }} elevation={3}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2 }}>
          Become an Event Host
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          Share your passion and create unforgettable experiences for our community. As a host, you can list and manage your own events, track ticket sales, and reach a wide audience.
        </Typography>
        
        {user && user.hostRequestStatus === 'pending' ? (
          <Alert severity="info">Your request is currently pending review by our team. We'll notify you soon!</Alert>
        ) : message ? (
          <Alert severity="success">{message}</Alert>
        ) : (
          <Button
            variant="contained"
            size="large"
            disabled={loading}
            onClick={handleRequest}
            sx={{ py: 1.5, px: 5 }}
          >
            {loading ? <CircularProgress size={24} /> : 'Submit Request to Become a Host'}
          </Button>
        )}
      </Paper>
    </Container>
  );
};

export default BecomeHostPage;