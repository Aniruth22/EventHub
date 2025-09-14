import React from 'react';
import { Container, Typography, Box, Paper, TextField, Button, Grid, Link as MuiLink } from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom'; // Import useNavigate
import axios from 'axios'; // Import axios

const SignUpPage = () => {
  const navigate = useNavigate(); // Hook to redirect the user

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData.entries());

    // --- ✅ API Call Logic ---
    try {
      // Send a POST request to your backend signup endpoint
      const response = await axios.post('http://localhost:5001/api/auth/signup', data);

      console.log(response.data);
      alert('Account created successfully! Please sign in.');
      navigate('/signin'); // Redirect to sign-in page on success
    } catch (error) {
      console.error('Signup failed:', error.response ? error.response.data : error.message);
      // Display a more user-friendly error message
      alert(`Signup failed: ${error.response ? error.response.data.error : 'Server error'}`);
    }
    // --- End of API Call Logic ---
  };

  return (
    <Container component="main" maxWidth="sm" sx={{ py: 6 }}>
      <Paper sx={{ p: { xs: 3, md: 5 }, mt: 4 }} elevation={4}>
        <Typography component="h1" variant="h4" sx={{ fontWeight: 'bold', textAlign: 'center', mb: 1 }}>
          Create an Account
        </Typography>
        <Typography color="text.secondary" sx={{ textAlign: 'center', mb: 4 }}>
          Join our community of event-goers and creators.
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit}>
          <TextField
            margin="normal"
            autoComplete="given-name"
            name="firstName"
            required
            fullWidth
            id="firstName"
            label="First Name"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="lastName"
            label="Last Name"
            name="lastName"
            autoComplete="family-name"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="new-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            size="large"
            sx={{ mt: 3, mb: 2, py: 1.5, backgroundColor: '#7b4397', '&:hover': { backgroundColor: '#6a3a83' } }}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <MuiLink component={RouterLink} to="/signin" variant="body2">
                Already have an account? Sign in
              </MuiLink>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
};

export default SignUpPage;