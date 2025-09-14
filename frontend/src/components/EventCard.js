import React from 'react';
import { Card, CardContent, CardMedia, Typography, Box, Rating } from '@mui/material';
import { LocationOn, CalendarMonth, PeopleAlt } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';

const EventCard = ({ event }) => {
  // Safely format the date
  const eventDate = event.date ? format(new Date(event.date), 'MMM dd, yyyy') : 'Date not available';

  return (
    // Use `_id` which comes from MongoDB
    <Card sx={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', height: '100%' }} component={Link} to={`/events/${event._id}`}>
      <CardMedia
        component="img"
        height="180"
        image={event.image}
        alt={event.title}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
          {event.title}
        </Typography>
        
        <Box display="flex" alignItems="center" my={1} color="text.secondary">
          <CalendarMonth sx={{ mr: 1, fontSize: '1rem' }} />
          <Typography variant="body2">{eventDate}</Typography>
        </Box>

        <Box display="flex" alignItems="center" my={1} color="text.secondary">
          <LocationOn sx={{ mr: 1, fontSize: '1rem' }} />
          <Typography variant="body2">{event.location}</Typography>
        </Box>
        
        {/* ✅ FIX: Use 'capacity' instead of 'registered' and check if it exists */}
        {event.capacity !== undefined && (
          <Box display="flex" alignItems="center" mb={1} color="text.secondary">
            <PeopleAlt sx={{ mr: 1, fontSize: '1rem' }} />
            <Typography variant="body2">{event.capacity.toLocaleString()} spots available</Typography>
          </Box>
        )}

        {/* ✅ FIX: Check if rating exists before showing it */}
        {event.rating && (
          <Box display="flex" alignItems="center">
            <Rating name="read-only" value={event.rating} precision={0.1} readOnly />
            <Typography variant="body2" color="text.secondary" ml={1}>({event.rating})</Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default EventCard;