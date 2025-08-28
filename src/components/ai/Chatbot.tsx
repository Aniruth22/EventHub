import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Send, ThumbsUp, ThumbsDown, X } from 'lucide-react';
import { Button } from '../ui/Button';
import { ChatMessage } from '../../types';

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      text: 'Hello! I\'m your AI event assistant. I can help you find events, answer questions, and provide recommendations. How can I help you today?',
      isBot: true,
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  const generateBotResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('music') || lowerMessage.includes('concert')) {
      return 'I found some great music events for you! Check out the Summer Music Festival in Austin and the Live Concert Stream happening this weekend. Would you like me to show you more music events?';
    }
    
    if (lowerMessage.includes('tech') || lowerMessage.includes('technology')) {
      return 'The Tech Summit 2025 in San Francisco looks perfect for you! It features industry leaders and great networking opportunities. The event is from March 15-17, 2025. Would you like me to help you book tickets?';
    }
    
    if (lowerMessage.includes('food') || lowerMessage.includes('cooking')) {
      return 'There\'s an amazing Cooking Workshop with Chef Marco Rossi on Valentine\'s Day! It\'s a hands-on Italian cuisine class in Chicago. Only 4 spots left! Should I help you secure a spot?';
    }
    
    if (lowerMessage.includes('recommend') || lowerMessage.includes('suggestion')) {
      return 'Based on your profile, I recommend the Tech Summit 2025 and the Art Gallery Opening in New York. Both align with your interests and have great reviews. Would you like detailed information about either event?';
    }
    
    if (lowerMessage.includes('price') || lowerMessage.includes('cost')) {
      return 'Event prices vary from $15 for virtual events to $299 for premium conferences. I can help you find events within your budget. What\'s your preferred price range?';
    }
    
    return 'That\'s a great question! I can help you with event recommendations, booking assistance, pricing information, and finding events by category or location. What specific information would you like?';
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      text: input,
      isBot: false,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate AI response delay
    setTimeout(() => {
      const botResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: generateBotResponse(input),
        isBot: true,
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleFeedback = (messageId: string, isPositive: boolean) => {
    // Handle feedback - in real app, send to backend
    console.log(`Feedback for message ${messageId}: ${isPositive ? 'positive' : 'negative'}`);
  };

  return (
    <>
      {/* Chatbot Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 bg-purple-600 text-white p-4 rounded-full shadow-xl hover:bg-purple-700 transition-colors duration-200 z-50"
      >
        {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </motion.button>

      {/* Chatbot Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="fixed bottom-24 right-6 w-96 h-96 bg-white rounded-xl shadow-2xl border border-gray-200 flex flex-col z-50"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-purple-600 to-teal-600 text-white p-4 rounded-t-xl">
              <h3 className="font-semibold">Event Assistant</h3>
              <p className="text-sm opacity-90">Ask me anything about events!</p>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
                >
                  <div className="max-w-[80%]">
                    <div
                      className={`p-3 rounded-lg ${
                        message.isBot
                          ? 'bg-gray-100 text-gray-800'
                          : 'bg-purple-600 text-white'
                      }`}
                    >
                      {message.text}
                    </div>
                    {message.isBot && (
                      <div className="flex items-center mt-2 space-x-2">
                        <button
                          onClick={() => handleFeedback(message.id, true)}
                          className="p-1 text-gray-400 hover:text-green-600 transition-colors duration-200"
                        >
                          <ThumbsUp className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleFeedback(message.id, false)}
                          className="p-1 text-gray-400 hover:text-red-600 transition-colors duration-200"
                        >
                          <ThumbsDown className="h-4 w-4" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 text-gray-800 p-3 rounded-lg">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="border-t border-gray-200 p-4">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask me about events..."
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
                <Button onClick={handleSend} size="sm" disabled={!input.trim()}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}