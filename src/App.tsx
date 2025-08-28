import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { Layout } from './components/layout/Layout';
import { Chatbot } from './components/ai/Chatbot';

// Pages
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import { Events } from './pages/Events';
import { EventDetail } from './pages/EventDetail';
import { Profile } from './pages/Profile';
import { SavedEvents } from './pages/SavedEvents';
import { Dashboard } from './pages/Dashboard';
import { LiveEvents } from './pages/LiveEvents';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/events" element={<Events />} />
            <Route path="/events/:id" element={<EventDetail />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/saved" element={<SavedEvents />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/live" element={<LiveEvents />} />
          </Routes>
          <Chatbot />
        </Layout>
      </Router>
    </AuthProvider>
  );
}

export default App;