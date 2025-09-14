import React from 'react';
import { Container, Paper, Typography, Box, Avatar, Divider, Grid, Button, CircularProgress } from '@mui/material';
import { useAuth } from '../context/AuthContext';
import { Link as RouterLink } from 'react-router-dom';

const ProfilePage = () => {
  const { user, loading } = useAuth();

  // Show a loading spinner while user data is being fetched
  if (loading) {
    return (
      <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
        <CircularProgress />
      </Container>
    );
  }

  // Handle case where user is not logged in or data is unavailable
  if (!user) {
    return (
      <Container>
        <Typography sx={{ mt: 4, textAlign: 'center' }}>
          Please <RouterLink to="/signin">sign in</RouterLink> to view your profile.
        </Typography>
      </Container>
    );
  }

  return (
    <Container sx={{ py: 6 }}>
      <Paper sx={{ p: { xs: 2, md: 4 } }} elevation={3}>
        <Grid container spacing={4} alignItems="center">
          <Grid item>
            <Avatar sx={{ width: 100, height: 100, fontSize: '3rem', bgcolor: 'primary.main' }}>
              {/* Display the first initial of the user's first name */}
              {user.firstName.charAt(0)}
            </Avatar>
          </Grid>
          <Grid item xs>
            <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
              {user.firstName} {user.lastName}
            </Typography>
            <Typography variant="h6" color="text.secondary">
              {user.email}
            </Typography>
            <Typography color="text.secondary">
              Role: {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
            </Typography>
          </Grid>

          {/* Button for attendees to request an upgrade */}
          {user.role === 'attendee' && (
             <Grid item xs={12} sx={{ mt: 2 }}>
                <Button component={RouterLink} to="/become-a-host" variant="outlined">
                  Want to host your own events? Click here to get started.
                </Button>
            </Grid>
          )}

        </Grid>
      </Paper>

      {/* Placeholder section for events the user has attended */}
      <Box sx={{ mt: 6 }}>
        <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 3 }}>
          Attended Events
        </Typography>
        <Paper sx={{ p: 4 }} elevation={2}>
          <Typography>You haven't attended any events yet.</Typography>
          {/* This is where you would map over an array of attended event cards */}
        </Paper>
      </Box>

      {/* Placeholder section for events the user has marked as favorite or upcoming */}
      <Box sx={{ mt: 6 }}>
        <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 3 }}>
          Upcoming & Favorite Events
        </Typography>
        <Paper sx={{ p: 4 }} elevation={2}>
          <Typography>You have no upcoming or saved events.</Typography>
          {/* This is where you would map over an array of upcoming event cards */}
        </Paper>
      </Box>
    </Container>
  );
};

export default ProfilePage;