import React, { useState, useEffect } from 'react';
import { Container, Grid, Typography, FormControl, InputLabel, Select, MenuItem, Box, Paper, CircularProgress } from '@mui/material';
import EventCard from '../components/EventCard';
import { useSearch } from '../context/SearchContext';
import DatePicker from 'react-datepicker';
import { format } from 'date-fns';
import axios from 'axios';
import './EventsPage.css';

// ✅ Data for filters is now defined here
const categories = ['All', 'Tech Event', 'Musical Concert', 'Sports', 'Hackathon', 'Workshop', 'Seminar'];
const indianStates = [
  'All', 'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 'Gujarat', 'Haryana',
  'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya',
  'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura',
  'Uttar Pradesh', 'Uttarakhand', 'West Bengal', 'Delhi'
];

const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('All');
  const [location, setLocation] = useState('All');
  const [selectedDate, setSelectedDate] = useState(null);
  const { searchTerm } = useSearch();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:5001/api/events');
        setEvents(response.data);
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  const filteredEvents = events.filter(event => {
    const categoryMatch = category === 'All' || event.category === category;
    const locationMatch = location === 'All' || event.location === location;
    const searchMatch = event.title.toLowerCase().includes(searchTerm.toLowerCase());
    const dateMatch = !selectedDate || format(new Date(event.date), 'yyyy-MM-dd') === format(new Date(selectedDate), 'yyyy-MM-dd');
    return categoryMatch && locationMatch && searchMatch && dateMatch;
  });

  return (
    // ...The rest of your JSX remains the same...
    <Container sx={{ py: 4 }} maxWidth="xl">
      <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} md={4}>
            <FormControl fullWidth>
              <InputLabel>Category</InputLabel>
              <Select value={category} label="Category" onChange={(e) => setCategory(e.target.value)}>
                {categories.map(cat => <MenuItem key={cat} value={cat}>{cat}</MenuItem>)}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={4}>
            <FormControl fullWidth>
              <InputLabel>Location</InputLabel>
              <Select value={location} label="Location" onChange={(e) => setLocation(e.target.value)}>
                {indianStates.map(state => <MenuItem key={state} value={state}>{state}</MenuItem>)}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={4}>
            <DatePicker
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              dateFormat="MMMM d, yyyy"
              placeholderText="Select a date"
              className="custom-datepicker-input"
              isClearable
            />
          </Grid>
        </Grid>
      </Paper>

      <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
        {searchTerm ? `Results for "${searchTerm}"` : 'All Events'}
      </Typography>
      <Box sx={{ display: 'flex' }}>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%', mt: 5 }}>
            <CircularProgress />
          </Box>
        ) : (
          <Grid container spacing={4}>
            {filteredEvents.length > 0 ? (
              filteredEvents.map(event => (
                <Grid item key={event._id} xs={12} sm={6} md={3}>
                  <EventCard event={event} />
                </Grid>
              ))
            ) : (
              <Grid item xs={12}>
                <Typography>No events found. Try adjusting your search or filters.</Typography>
              </Grid>
            )}
          </Grid>
        )}
      </Box>
    </Container>
  );
};

export default EventsPage;