import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Paper, Button, CircularProgress, Alert, Divider } from '@mui/material';
import api from '../api/axiosConfig'; // Use our configured axios instance
import { format } from 'date-fns';

const AdminDashboard = () => {
  const [pendingEvents, setPendingEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchPendingEvents = async () => {
    try {
      setLoading(true);
      const res = await api.get('/events/pending');
      setPendingEvents(res.data);
    } catch (err) {
      setError('Failed to fetch pending events.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPendingEvents();
  }, []);

  const handleEventApproval = async (eventId, status) => {
    try {
      await api.put(`/events/approve/${eventId}`, { status });
      // Refresh the list after an action
      fetchPendingEvents();
    } catch (err) {
      alert('Action failed. Please try again.');
      console.error(err);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container sx={{ py: 6 }}>
      <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold', mb: 4 }}>
        Admin Dashboard
      </Typography>

      {error && <Alert severity="error">{error}</Alert>}

      <Paper sx={{ p: 3 }} elevation={3}>
        <Typography variant="h5" sx={{ mb: 2 }}>Pending Event Approvals</Typography>
        {pendingEvents.length > 0 ? (
          pendingEvents.map(event => (
            <Box key={event._id} sx={{ mb: 3, p: 2, border: '1px solid #ddd', borderRadius: 2 }}>
              <Typography variant="h6">{event.title}</Typography>
              <Typography color="text.secondary">Date: {format(new Date(event.date), 'MMM dd, yyyy')}</Typography>
              <Typography color="text.secondary">Location: {event.location}</Typography>
              <Typography sx={{ my: 1 }}>{event.description}</Typography>
              <Divider sx={{ my: 2 }} />
              <Box>
                <Button variant="contained" color="success" sx={{ mr: 2 }} onClick={() => handleEventApproval(event._id, 'Approved')}>
                  Approve
                </Button>
                <Button variant="contained" color="error" onClick={() => handleEventApproval(event._id, 'Rejected')}>
                  Reject
                </Button>
              </Box>
            </Box>
          ))
        ) : (
          <Typography>There are no events awaiting approval.</Typography>
        )}
      </Paper>
    </Container>
  );
};

export default AdminDashboard;