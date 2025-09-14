import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Typography, Box, Paper, TextField, Button, Grid, CircularProgress, Alert } from '@mui/material';
import api from '../api/axiosConfig'; // ✅ IMPORT the configured api instance, NOT the default axios

const CreateEventFormPage = () => {
  const { category } = useParams();
  const navigate = useNavigate();
  const [posterFile, setPosterFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const categoryTitle = category.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

  const handleFileChange = (event) => {
    setPosterFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    if (!posterFile) {
      setError('Please upload an event poster.');
      return;
    }
    setLoading(true);

    const imageFormData = new FormData();
    imageFormData.append('eventPoster', posterFile);

    try {
      // ✅ USE 'api' which AUTOMATICALLY sends the token
      const uploadResponse = await api.post('/upload', imageFormData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      const imageUrl = uploadResponse.data.file.filePath;
      const formDetails = new FormData(event.target);

      const eventData = {
        title: formDetails.get('title'),
        description: formDetails.get('description'),
        date: formDetails.get('date'),
        timeSlots: formDetails.get('timeSlots'),
        location: formDetails.get('location'),
        capacity: formDetails.get('capacity'),
        ticketPrice: formDetails.get('ticketPrice'),
        prizeMoney: formDetails.get('prizeMoney'),
        image: `http://localhost:5001${imageUrl}`,
        category: categoryTitle,
      };
      
      // ✅ USE 'api' HERE AS WELL
      const eventResponse = await api.post('/events', eventData);
      
      console.log("Event created:", eventResponse.data);
      alert('Your event has been submitted successfully!');
      navigate('/events');

    } catch (err) {
      console.error("Error creating event:", err);
      // Check if the error is a 403 Forbidden, which means they are not a host
      if (err.response && err.response.status === 403) {
        setError('You do not have permission to create an event. Please request host privileges.');
      } else {
        setError('Failed to submit event. Please check the console.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container sx={{ py: 6 }} maxWidth="md">
      <Paper sx={{ p: { xs: 3, md: 5 } }} elevation={4}>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold', mb: 1 }}>
          Create a New {categoryTitle}
        </Typography>
        <Typography color="text.secondary" sx={{ mb: 4 }}>
          Fill in the details below to list your event.
        </Typography>
        <Box component="form" onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField required fullWidth name="title" label="Event Title" />
            </Grid>
            <Grid item xs={12}>
              <TextField required fullWidth multiline rows={4} name="description" label="Event Description" />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField required fullWidth name="date" label="Event Date" type="date" InputLabelProps={{ shrink: true }} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField required fullWidth name="timeSlots" label="Time Slots (e.g., 10am, 2pm)" />
            </Grid>
            <Grid item xs={12}>
              <TextField required fullWidth name="location" label="Location (e.g., Hyderabad)" />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField required fullWidth type="number" name="capacity" label="Number of People Allowed" />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField required fullWidth type="number" name="ticketPrice" label="Ticket Price (per person)" />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth name="prizeMoney" label="Winner Prize (if applicable)" />
            </Grid>
            <Grid item xs={12}>
              <Typography color="text.secondary" gutterBottom>Event Poster</Typography>
              <TextField required fullWidth type="file" name="poster" onChange={handleFileChange} inputProps={{ accept: 'image/*' }} />
            </Grid>
            
            {error && <Grid item xs={12}><Alert severity="error">{error}</Alert></Grid>}
            
            <Grid item xs={12}>
              <Button type="submit" fullWidth variant="contained" size="large" disabled={loading} sx={{ py: 1.5, backgroundColor: '#7b4397', '&:hover': { backgroundColor: '#6a3a83' } }}>
                {loading ? <CircularProgress size={24} /> : 'Submit Event for Review'}
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
};

export default CreateEventFormPage;