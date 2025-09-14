import React, { useState, useEffect } from 'react';
import { Container, Grid, Typography, Box, CircularProgress, Alert } from '@mui/material';
import EventCard from '../components/EventCard';
import axios from 'axios';

const LiveEventsPage = () => {
  const [liveEvents, setLiveEvents] = useState([]);
  const [weekendEvents, setWeekendEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchLiveAndWeekendEvents = async () => {
      try {
        setLoading(true);
        // Fetch both sets of events in parallel
        const [liveRes, weekendRes] = await Promise.all([
          axios.get('http://localhost:5001/api/events/live'),
          axios.get('http://localhost:5001/api/events/weekend')
        ]);
        setLiveEvents(liveRes.data);
        setWeekendEvents(weekendRes.data);
      } catch (err) {
        setError('Failed to fetch events. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchLiveAndWeekendEvents();
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <Container sx={{ py: 4 }}><Alert severity="error">{error}</Alert></Container>;
  }

  return (
    <Container sx={{ py: 4 }} maxWidth="lg">
      {/* Happening Now Section */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
          Happening Now
        </Typography>
        <Grid container spacing={4}>
          {liveEvents.length > 0 ? (
            liveEvents.map(event => (
              <Grid item key={event._id} xs={12} sm={6} md={4}>
                <EventCard event={event} />
              </Grid>
            ))
          ) : (
            <Grid item xs={12}>
              <Typography>No events are live right now. Check back soon!</Typography>
            </Grid>
          )}
        </Grid>
      </Box>

      {/* This Weekend Section */}
      <Box>
        <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
          This Weekend
        </Typography>
        <Grid container spacing={4}>
          {weekendEvents.length > 0 ? (
            weekendEvents.map(event => (
              <Grid item key={event._id} xs={12} sm={6} md={4}>
                <EventCard event={event} />
              </Grid>
            ))
          ) : (
            <Grid item xs={12}>
              <Typography>No events scheduled for this weekend yet.</Typography>
            </Grid>
          )}
        </Grid>
      </Box>
    </Container>
  );
};

export default LiveEventsPage;