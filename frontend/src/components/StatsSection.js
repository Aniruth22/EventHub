import React from 'react';
import { Container, Grid, Paper, Typography, Box, Rating } from '@mui/material';

const stats = [
  {
    icon: '🎉', // Replaced icon component with emoji
    value: '1,500+',
    label: 'Events Hosted',
  },
  {
    icon: '👥', // Replaced icon component with emoji
    value: '1.2M+',
    label: 'Tickets Booked',
  },
  {
    icon: <Rating name="read-only" value={4.9} precision={0.1} readOnly size="large" />, // Kept Rating as it's not an icon
    value: '', // Value is now represented by the Rating component itself
    label: 'User Rating',
  },
];

const StatsSection = () => {
  return (
    <Box sx={{ py: 8, backgroundColor: '#f9f9f9' }}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {stats.map((stat, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Paper elevation={3} sx={{ p: 4, textAlign: 'center', height: '100%' }}>
                <Typography variant="h3" mb={2}>{stat.icon}</Typography>
                <Typography variant="h3" component="p" sx={{ fontWeight: 'bold' }}>
                  {stat.value}
                </Typography>
                <Typography color="text.secondary">{stat.label}</Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default StatsSection;