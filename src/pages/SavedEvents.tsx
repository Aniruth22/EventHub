import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Calendar as CalendarIcon, Download } from 'lucide-react';
import { mockEvents } from '../data/mockData';
import { useAuth } from '../contexts/AuthContext';
import { EventGrid } from '../components/events/EventGrid';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';

export function SavedEvents() {
  const { user } = useAuth();
  const [savedEventIds] = useState(['1', '2', '5']); // Mock saved events
  const savedEvents = mockEvents.filter(event => savedEventIds.includes(event.id));

  const handleRemoveEvent = (eventId: string) => {
    // In a real app, this would remove from saved events
    console.log('Removing event from saved:', eventId);
  };

  const exportToCalendar = () => {
    // Mock calendar export
    alert('Events exported to your calendar!');
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Please sign in</h2>
          <p className="text-gray-600 mb-6">You need to be logged in to view saved events</p>
          <Button>Sign In</Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center">
              <Heart className="h-8 w-8 text-red-500 mr-3 fill-current" />
              Saved Events
            </h1>
            <p className="text-gray-600 mt-2">
              {savedEvents.length} events saved to your collection
            </p>
          </div>
          
          {savedEvents.length > 0 && (
            <div className="flex space-x-3">
              <Button variant="outline" onClick={exportToCalendar}>
                <Download className="h-4 w-4 mr-2" />
                Export to Calendar
              </Button>
            </div>
          )}
        </div>
      </motion.div>

      {/* Calendar Integration */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-8"
      >
        <Card className="p-6 bg-gradient-to-r from-blue-50 to-purple-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <CalendarIcon className="h-6 w-6 text-blue-600 mr-3" />
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Calendar Integration</h3>
                <p className="text-gray-600 text-sm">
                  Sync your saved events with Google Calendar
                </p>
              </div>
            </div>
            <Button variant="primary">
              Connect Calendar
            </Button>
          </div>
        </Card>
      </motion.div>

      {/* Events Grid */}
      {savedEvents.length > 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <EventGrid 
            events={savedEvents}
            onSaveEvent={handleRemoveEvent}
            savedEvents={savedEventIds}
            showSaveButton={true}
          />
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-16"
        >
          <Heart className="h-16 w-16 text-gray-300 mx-auto mb-6" />
          <h3 className="text-2xl font-semibold text-gray-900 mb-4">
            No saved events yet
          </h3>
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            Start exploring events and save your favorites for easy access later
          </p>
          <Button>Discover Events</Button>
        </motion.div>
      )}
    </div>
  );
}