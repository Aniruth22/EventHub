import axios from 'axios';

// Create a new instance of axios
const api = axios.create({
  baseURL: 'http://localhost:5001/api', // Your backend's base URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// This is the most important part: The Interceptor
// It runs before every request is sent
api.interceptors.request.use(
  (config) => {
    // Get the token from localStorage
    const token = localStorage.getItem('authToken');
    if (token) {
      // If the token exists, add it to the Authorization header
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;