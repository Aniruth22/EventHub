import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { SearchProvider } from './context/SearchContext';
import { AuthProvider } from './context/AuthContext'; // ✅ IMPORT AUTH PROVIDER
import 'react-datepicker/dist/react-datepicker.css';
import { ThemeProvider } from './context/ThemeContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider> {/* ✅ WRAP WITH AUTH PROVIDER */}
      <SearchProvider>
        <ThemeProvider> {
          <App />
        }
        </ThemeProvider>
      </SearchProvider>
    </AuthProvider>
  </React.StrictMode>
);