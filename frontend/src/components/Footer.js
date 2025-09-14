import React from 'react';
import { Container, Grid, Typography, Box, Link as MuiLink } from '@mui/material';

const footerLinks = {
  'Use EventHub': ['Create Events', 'Pricing', 'Marketing Platform', 'Mobile Ticket App', 'FAQs'],
  'Plan Events': ['Sell Tickets Online', 'Event Management Software', 'Virtual Events Platform', 'QR Codes for Check-In'],
  'Find Events': ['New Orleans Events', 'San Francisco Events', 'Tulum Music Events', 'New York Events'],
};

const Footer = () => {
  return (
    <Box component="footer" sx={{ bgcolor: '#2c2c2c', color: 'white', py: 6 }}>
      <Container maxWidth="lg">
        <Grid container spacing={5}>
          {Object.entries(footerLinks).map(([title, links]) => (
            <Grid  xs={6} sm={4} md={3} key={title}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>{title}</Typography>
              <Box>
                {links.map((link) => (
                  <MuiLink href="#" key={link} color="inherit" display="block" sx={{ mb: 1, textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>{link}</MuiLink>
                ))}
              </Box>
            </Grid>
          ))}
          <Grid  xs={12} sm={4} md={3}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>Connect With Us</Typography>
            <Box>
              <MuiLink href="#" color="inherit" display="block" sx={{ mb: 1, textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>Facebook</MuiLink>
              <MuiLink href="#" color="inherit" display="block" sx={{ mb: 1, textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>Twitter</MuiLink>
              <MuiLink href="#" color="inherit" display="block" sx={{ mb: 1, textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>Instagram</MuiLink>
              <MuiLink href="#" color="inherit" display="block" sx={{ mb: 1, textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>LinkedIn</MuiLink>
            </Box>
          </Grid>
        </Grid>
        <Box sx={{ mt: 6, pt: 3, borderTop: '1px solid #444', textAlign: 'center' }}>
          <Typography variant="body2">
            © {new Date().getFullYear()} EventHub. All rights reserved.
          </Typography>
          <Typography variant="body2" sx={{ mt: 1 }}>
            <MuiLink href="#" color="inherit" sx={{ mx: 1 }}>Terms</MuiLink> • 
            <MuiLink href="#" color="inherit" sx={{ mx: 1 }}>Privacy</MuiLink> • 
            <MuiLink href="#" color="inherit" sx={{ mx: 1 }}>Accessibility</MuiLink>
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;