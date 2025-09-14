import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(localStorage.getItem('authToken') || null);
  const [user, setUser] = useState(null); // ✅ ADD USER STATE
  const [loading, setLoading] = useState(true);

  // Function to set the auth token for all subsequent axios requests
  const setAuthHeader = (token) => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common['Authorization'];
    }
  };
  
  // ✅ LOAD USER DATA IF TOKEN EXISTS
  const loadUser = async () => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setAuthHeader(token);
      try {
        const res = await axios.get('http://localhost:5001/api/profile/me');
        setUser(res.data);
      } catch (err) {
        // Token might be invalid/expired
        localStorage.removeItem('authToken');
        setAuthToken(null);
        setUser(null);
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    loadUser();
  }, []);

  const login = (token) => {
    localStorage.setItem('authToken', token);
    setAuthToken(token);
    setAuthHeader(token);
    loadUser(); // Load user data after login
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    setAuthToken(null);
    setUser(null);
    setAuthHeader(null);
  };

  const value = {
    authToken,
    user,
    isAuthenticated: !!authToken,
    loading,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};