import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { CssBaseline, Paper } from '@mui/material';
// No need to import useTheme here as the Paper component handles it globally

// Import Layout Components
import Navbar from './components/Navbar';
import ChatbotIcon from './components/ChatbotIcon';
import ChatWindow from './components/ChatWindow';
import Footer from './components/Footer';
import HostRoute from './components/HostRoute';
import AdminRoute from './components/AdminRoute';

// Import Page Components
import HomePage from './pages/HomePage';
import EventsPage from './pages/EventsPage';
import EventDetailPage from './pages/EventDetailPage';
import LiveEventsPage from './pages/LiveEventsPage';
import ListEventPage from './pages/ListEventPage';
// ✅ FIX: Corrected the typo from 'CreateEventEventFormPage'
import CreateEventFormPage from './pages/CreateEventFormPage';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import ProfilePage from './pages/ProfilePage';
import SettingsPage from './pages/SettingsPage';
import BecomeHostPage from './pages/BecomeHostPage';
import AdminDashboard from './pages/AdminDashboard';

// This inner component handles the layout and conditional rendering logic
const AppContent = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const location = useLocation();
  const showChatbot = location.pathname !== '/profile';

  return (
    <div className="App" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />
      <main style={{ flex: 1 }}>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/events/:eventId" element={<EventDetailPage />} />
          <Route path="/live" element={<LiveEventsPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/become-a-host" element={<BecomeHostPage />} />
          
          {/* ADMIN-ONLY PROTECTED ROUTE */}
          <Route element={<AdminRoute />}>
            <Route path="/admin" element={<AdminDashboard />} />
          </Route>

          {/* HOST-ONLY PROTECTED ROUTES */}
          <Route element={<HostRoute />}>
            <Route path="/list-event" element={<ListEventPage />} />
            <Route path="/list-event/:category" element={<CreateEventFormPage />} />
          </Route>
        </Routes>
      </main>
      
      {showChatbot && (
        <>
          <ChatbotIcon onToggleChat={() => setIsChatOpen(!isChatOpen)} />
          {isChatOpen && <ChatWindow onClose={() => setIsChatOpen(false)} />}
        </>
      )}
      
      <Footer />
    </div>
  );
}

// The main App component wraps everything
function App() {
  // ✅ FIX: Removed unused 'mode' variable. The Paper component automatically
  // gets the theme from the context provided in index.js.
  return (
    <Paper style={{ borderRadius: 0, minHeight: '100vh' }}>
      <CssBaseline />
      <Router>
        <AppContent />
      </Router>
    </Paper>
  );
}

export default App;