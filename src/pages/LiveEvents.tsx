import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Wifi, Users, Calendar, MapPin, Play } from 'lucide-react';
import { mockEvents } from '../data/mockData';
import { useAuth } from '../contexts/AuthContext';
import { EventGrid } from '../components/events/EventGrid';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';

export function LiveEvents() {
  const { user } = useAuth();
  const [viewerCount, setViewerCount] = useState(4250);
  const [savedEvents, setSavedEvents] = useState<string[]>([]);
  
  const liveEvents = mockEvents.filter(event => event.is_live);
  const upcomingEvents = mockEvents.filter(event => !event.is_live && new Date(event.date) > new Date());

  // Simulate live viewer count updates
  useEffect(() => {
    const interval = setInterval(() => {
      setViewerCount(prev => prev + Math.floor(Math.random() * 20) - 10);
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);

  const handleSaveEvent = (eventId: string) => {
    setSavedEvents(prev => 
      prev.includes(eventId) 
        ? prev.filter(id => id !== eventId)
        : [...prev, eventId]
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <div className="flex items-center justify-center mb-4">
          <Wifi className="h-8 w-8 text-red-500 mr-3" />
          <h1 className="text-4xl font-bold text-gray-900">Live Events</h1>
        </div>
        <p className="text-xl text-gray-600">
          Join live events happening right now or catch upcoming streams
        </p>
      </motion.div>

      {/* Live Now Section */}
      {liveEvents.length > 0 && (
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-16"
        >
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900 flex items-center">
              <span className="w-3 h-3 bg-red-500 rounded-full mr-3 animate-pulse"></span>
              Live Now
            </h2>
            <div className="flex items-center text-gray-600">
              <Users className="h-5 w-5 mr-2" />
              <span className="font-semibold">{viewerCount.toLocaleString()}</span>
              <span className="ml-1">viewers</span>
            </div>
          </div>

          {/* Featured Live Event */}
          <Card className="mb-8 overflow-hidden">
            <div className="relative">
              <img
                src={liveEvents[0].image_url}
                alt={liveEvents[0].title}
                className="w-full h-64 lg:h-80 object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                <Button size="lg" className="bg-white text-gray-900 hover:bg-gray-100">
                  <Play className="h-6 w-6 mr-2" />
                  Join Live Stream
                </Button>
              </div>
              <div className="absolute top-4 left-4">
                <span className="bg-red-600 text-white px-4 py-2 rounded-full text-sm font-semibold flex items-center">
                  <span className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse"></span>
                  LIVE
                </span>
              </div>
              <div className="absolute bottom-4 right-4 bg-black bg-opacity-60 text-white px-3 py-2 rounded-lg">
                <div className="flex items-center text-sm">
                  <Users className="h-4 w-4 mr-2" />
                  {viewerCount.toLocaleString()} watching
                </div>
              </div>
            </div>
            <div className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{liveEvents[0].title}</h3>
                  <p className="text-gray-600 mb-4">{liveEvents[0].description}</p>
                  <div className="flex items-center space-x-4 text-gray-600">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      <span className="text-sm">{liveEvents[0].date}</span>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span className="text-sm">{liveEvents[0].location}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-gray-900">${liveEvents[0].price}</div>
                  <div className="text-gray-600 text-sm">per ticket</div>
                </div>
              </div>
            </div>
          </Card>

          {/* Other Live Events */}
          {liveEvents.length > 1 && (
            <EventGrid 
              events={liveEvents.slice(1)}
              onSaveEvent={handleSaveEvent}
              savedEvents={savedEvents}
              showSaveButton={!!user}
            />
          )}
        </motion.section>
      )}

      {/* Upcoming Live Events */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Starting Soon</h2>
        <EventGrid 
          events={upcomingEvents.slice(0, 6)}
          onSaveEvent={handleSaveEvent}
          savedEvents={savedEvents}
          showSaveButton={!!user}
        />
      </motion.section>

      {/* Live Stream Info */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-16"
      >
        <Card className="p-8 bg-gradient-to-r from-purple-50 to-teal-50">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Host Your Live Event</h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Reach a global audience with our live streaming platform. Engage with attendees in real-time through interactive features.
            </p>
            <Button size="lg">
              Start Live Event
              <Wifi className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </Card>
      </motion.section>
    </div>
  );
}