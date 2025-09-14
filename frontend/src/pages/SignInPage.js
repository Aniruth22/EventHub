import React from 'react';
import { Container, Typography, Box, Paper, TextField, Button, Grid, Link as MuiLink } from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext'; // ✅ IMPORT THE AUTH HOOK

const SignInPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth(); // ✅ GET THE LOGIN FUNCTION FROM CONTEXT

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await axios.post('http://localhost:5001/api/auth/signin', data);
      const { token } = response.data;

      // ✅ Use the context's login function to update the global state
      login(token);

      alert('Signed in successfully!');
      navigate('/'); // Redirect to the homepage
    } catch (error) {
      console.error('Signin failed:', error.response ? error.response.data : error.message);
      alert(`Signin failed: ${error.response ? error.response.data.error : 'Server error'}`);
    }
  };

  return (
    // ... The rest of your SignInPage JSX remains the same ...
    <Container component="main" maxWidth="sm" sx={{ py: 6 }}>
      <Paper sx={{ p: { xs: 3, md: 5 }, mt: 4 }} elevation={4}>
        <Typography component="h1" variant="h4" sx={{ fontWeight: 'bold', textAlign: 'center', mb: 1 }}>
          Sign In
        </Typography>
        <Typography color="text.secondary" sx={{ textAlign: 'center', mb: 4 }}>
          Welcome back! Please enter your details.
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            size="large"
            sx={{ mt: 3, mb: 2, py: 1.5, backgroundColor: '#7b4397', '&:hover': { backgroundColor: '#6a3a83' } }}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              {/* <MuiLink href="#" variant="body2">
                Forgot password?
              </MuiLink> */}
            </Grid>
            <Grid item>
              <MuiLink component={RouterLink} to="/signup" variant="body2">
                {"Don't have an account? Sign Up"}
              </MuiLink>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
};

export default SignInPage;