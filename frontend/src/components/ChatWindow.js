import React, { useState } from 'react';
import { Paper, Typography, Box, TextField, IconButton, CircularProgress } from '@mui/material';
import { Send, Close } from '@mui/icons-material';
import axios from 'axios';

const ChatWindow = ({ onClose }) => {
  const [messages, setMessages] = useState([{ sender: 'bot', text: 'Hello! How can I help you with events today?' }]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (input.trim() === '') return;

    const userMessage = { sender: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Send message to the backend
      const response = await axios.post('http://localhost:5001/api/chat', {
        message: input,
      });
      const botMessage = { sender: 'bot', text: response.data.reply };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Chatbot error:', error);
      const errorMessage = { sender: 'bot', text: 'Sorry, I am having trouble connecting. Please try again later.' };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Paper 
      elevation={8}
      sx={{
        position: 'fixed',
        bottom: 100,
        right: 20,
        width: 350,
        height: 500,
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 3,
        overflow: 'hidden',
        zIndex: 1100,
      }}
    >
      <Box sx={{ p: 2, bgcolor: 'primary.main', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6">Event Assistant</Typography>
        <IconButton onClick={onClose} size="small" sx={{ color: 'white' }}>
          <Close />
        </IconButton>
      </Box>
      <Box sx={{ flexGrow: 1, p: 2, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 2 }}>
        {messages.map((msg, index) => (
          <Box key={index} alignSelf={msg.sender === 'user' ? 'flex-end' : 'flex-start'}>
            <Paper 
              elevation={2} 
              sx={{ 
                p: 1.5, 
                borderRadius: msg.sender === 'user' ? '20px 20px 5px 20px' : '20px 20px 20px 5px',
                bgcolor: msg.sender === 'user' ? 'primary.light' : '#f0f0f0',
                color: msg.sender === 'user' ? 'white' : 'black',
              }}
            >
              <Typography variant="body1">{msg.text}</Typography>
            </Paper>
          </Box>
        ))}
        {isLoading && <CircularProgress size={24} sx={{ alignSelf: 'flex-start', ml: 1.5, mt: 1 }} />}
      </Box>
      <Box sx={{ p: 1, borderTop: '1px solid #ccc', display: 'flex' }}>
        <TextField
          fullWidth
          variant="outlined"
          size="small"
          placeholder="Ask about events..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
        />
        <IconButton color="primary" onClick={handleSend} disabled={isLoading}>
          <Send />
        </IconButton>
      </Box>
    </Paper>
  );
};

export default ChatWindow;