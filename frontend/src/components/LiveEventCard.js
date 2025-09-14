import React from 'react';
import { Card, CardContent, CardMedia, Typography, Box, Chip } from '@mui/material';
import { LocationOn } from '@mui/icons-material';
import { Link } from 'react-router-dom';

const LiveEventCard = ({ event }) => {
  return (
    <Card sx={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', height: '100%' }} component={Link} to={`/events/${event.id}`}>
      <Box sx={{ position: 'relative' }}>
        <CardMedia
          component="img"
          height="180"
          image={event.image}
          alt={event.title}
        />
        <Chip 
          label="LIVE" 
          color="error" 
          size="small"
          sx={{ 
            position: 'absolute', 
            top: 8, 
            right: 8,
            fontWeight: 'bold',
            boxShadow: '0 2px 5px rgba(0,0,0,0.3)'
          }} 
        />
      </Box>
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
          {event.title}
        </Typography>
        <Box display="flex" alignItems="center" my={1} color="text.secondary">
          <LocationOn sx={{ mr: 1, fontSize: '1rem' }} />
          <Typography variant="body2">{event.location}</Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default LiveEventCard;