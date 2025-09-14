import React, { useState, useEffect } from 'react';
import { Container, Grid, Typography, Box, Button, CircularProgress, Alert } from '@mui/material';
import EventCard from './EventCard';
import { Link } from 'react-router-dom';
import axios from 'axios';

const FeaturedEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchFeaturedEvents = async () => {
      try {
        setLoading(true);
        // Fetch events from your backend
        const response = await axios.get('http://localhost:5001/api/events');
        // Show the first 6 events as "featured"
        setEvents(response.data.slice(0, 6));
      } catch (err) {
        setError('Could not load featured events.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchFeaturedEvents();
  }, []);

  return (
    <Container sx={{ py: 8 }} maxWidth="lg">
      <Typography variant="h3" component="h2" sx={{ fontWeight: 'bold', textAlign: 'center', mb: 6 }}>
        Featured Events
      </Typography>
      
      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <CircularProgress />
        </Box>
      )}

      {error && <Alert severity="error">{error}</Alert>}

      {!loading && !error && (
        <>
          <Grid container spacing={4}>
            {events.map(event => (
              <Grid item key={event._id} xs={12} sm={6} md={4}>
                <EventCard event={event} />
              </Grid>
            ))}
          </Grid>
          <Box sx={{ textAlign: 'center', mt: 6 }}>
            <Button component={Link} to="/events" variant="contained" size="large" sx={{ backgroundColor: '#7b4397', '&:hover': { backgroundColor: '#6a3a83' } }}>
              View All Events
            </Button>
          </Box>
        </>
      )}
    </Container>
  );
};

export default FeaturedEvents;