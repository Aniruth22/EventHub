import React from 'react';
import { Container, Grid, Typography, Card, CardActionArea, CardContent, Box } from '@mui/material';
import { Computer, MusicNote, SportsSoccer, Code, School, Business } from '@mui/icons-material';
import { Link } from 'react-router-dom';

const eventCategories = [
  { name: 'Tech Event', icon: <Computer sx={{ fontSize: 50 }} />, link: 'tech-event' },
  { name: 'Musical Concert', icon: <MusicNote sx={{ fontSize: 50 }} />, link: 'musical-concert' },
  { name: 'Sports', icon: <SportsSoccer sx={{ fontSize: 50 }} />, link: 'sports' },
  { name: 'Hackathon', icon: <Code sx={{ fontSize: 50 }} />, link: 'hackathon' },
  { name: 'Workshop', icon: <School sx={{ fontSize: 50 }} />, link: 'workshop' },
  { name: 'Seminar', icon: <Business sx={{ fontSize: 50 }} />, link: 'seminar' },
];

const ListEventPage = () => {
  return (
    <Container sx={{ py: 6 }} maxWidth="md">
      <Typography variant="h3" component="h1" align="center" sx={{ fontWeight: 'bold', mb: 2 }}>
        Host Your Event
      </Typography>
      <Typography variant="h6" align="center" color="text.secondary" sx={{ mb: 6 }}>
        Select the type of event you want to create and share with the world.
      </Typography>
      <Grid container spacing={4}>
        {eventCategories.map((category) => (
          <Grid item key={category.name} xs={12} sm={6} md={4}>
            <Card sx={{ height: '100%', transition: '0.3s', '&:hover': { transform: 'scale(1.03)', boxShadow: 6 } }}>
              <CardActionArea component={Link} to={`/list-event/${category.link}`} sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <CardContent sx={{ textAlign: 'center' }}>
                  <Box sx={{ mb: 2, color: 'primary.main' }}>{category.icon}</Box>
                  <Typography gutterBottom variant="h5" component="div" sx={{ fontWeight: 'bold' }}>
                    {category.name}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ListEventPage;