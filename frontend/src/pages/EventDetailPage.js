import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography, Box, Paper, Button, Chip, Rating, CircularProgress, Alert } from '@mui/material';
import { LocationOn, CalendarMonth, PeopleAlt } from '@mui/icons-material';
import { format } from 'date-fns';
import axios from 'axios';
import BookingModal from '../components/BookingModal'; // Import the new modal

const EventDetailPage = () => {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:5001/api/events/${eventId}`);
        setEvent(response.data);
      } catch (err) {
        setError('Failed to fetch event details.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchEvent();
  }, [eventId]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  if (!event) {
    return <Typography>Event not found!</Typography>;
  }

  return (
    <>
      <Container sx={{ py: 4 }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <img src={event.image} alt={event.title} style={{ width: '100%', height: '400px', objectFit: 'cover', borderRadius: '8px' }} />
          <Box sx={{ mt: 3 }}>
            <Chip label={event.category} color="primary" />
            <Typography variant="h3" component="h1" sx={{ fontWeight: 'bold', my: 2 }}>{event.title}</Typography>
            
            <Box display="flex" alignItems="center" my={2} color="text.secondary">
              <CalendarMonth sx={{ mr: 1.5 }} />
              <Typography variant="h6">{format(new Date(event.date), 'MMMM dd, yyyy')}</Typography>
            </Box>
            <Box display="flex" alignItems="center" my={2} color="text.secondary">
              <LocationOn sx={{ mr: 1.5 }} />
              <Typography variant="h6">{event.location}</Typography>
            </Box>

            <Typography variant="body1" sx={{ my: 3 }}>{event.description}</Typography>
            
            {event.rating && <Rating value={event.rating} readOnly />}

            <Button onClick={() => setIsModalOpen(true)} variant="contained" size="large" sx={{ mt: 3, backgroundColor: '#7b4397', '&:hover': { backgroundColor: '#6a3a83' } }}>
              Book Tickets
            </Button>
          </Box>
        </Paper>
      </Container>
      
      {/* The Booking Modal */}
      {isModalOpen && <BookingModal open={isModalOpen} handleClose={() => setIsModalOpen(false)} event={event} />}
    </>
  );
};

export default EventDetailPage;