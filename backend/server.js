const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');

// Load environment variables from .env file
dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.error(err));

// Create an Express application
const app = express();

// Middleware
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(express.json()); // Allow the server to accept JSON data in requests

// Serve static files from the 'uploads' folder, making them publicly accessible
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// --- API Routes ---
const uploadRoutes = require('./routes/upload');
const authRoutes = require('./routes/auth');
const chatRoutes = require('./routes/chat');
const eventRoutes = require('./routes/events');
const profileRoutes = require('./routes/profile');

const usersRoutes = require('./routes/users');

// Register the routes
app.use('/api/upload', uploadRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/users', usersRoutes);

// Define a simple test route for the root URL to check if the server is running
app.get('/', (req, res) => {
  res.send('EventHub Backend is running!');
});

// Define the port the server will run on, from .env file or default to 5000
const PORT = process.env.PORT || 5000;

// Start the server and listen for incoming requests
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));