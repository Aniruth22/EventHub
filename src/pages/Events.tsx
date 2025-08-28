import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter } from 'lucide-react';
import { mockEvents } from '../data/mockData';
import { useAuth } from '../contexts/AuthContext';
import { EventGrid } from '../components/events/EventGrid';
import { EventFilter } from '../components/events/EventFilter';
import { Input } from '../components/ui/Input';

export function Events() {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [savedEvents, setSavedEvents] = useState<string[]>([]);

  const filteredEvents = useMemo(() => {
    return mockEvents.filter(event => {
      const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           event.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = !selectedCategory || event.category === selectedCategory;
      const matchesLocation = !selectedLocation || event.location === selectedLocation;
      
      return matchesSearch && matchesCategory && matchesLocation;
    });
  }, [searchQuery, selectedCategory, selectedLocation]);

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
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Discover Events</h1>
        <p className="text-xl text-gray-600 mb-8">
          Find the perfect events for your interests
        </p>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto">
          <div className="relative">
            <Search className="h-5 w-5 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search events by title, description, or tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent text-lg"
            />
          </div>
        </div>
      </motion.div>

      {/* Filters */}
      <EventFilter
        selectedCategory={selectedCategory}
        selectedLocation={selectedLocation}
        onCategoryChange={setSelectedCategory}
        onLocationChange={setSelectedLocation}
      />

      {/* Results */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            {filteredEvents.length} Events Found
          </h2>
          <div className="flex items-center space-x-2 text-gray-600">
            <Filter className="h-4 w-4" />
            <span className="text-sm">Sort by: Date</span>
          </div>
        </div>

        {filteredEvents.length > 0 ? (
          <EventGrid 
            events={filteredEvents} 
            onSaveEvent={handleSaveEvent}
            savedEvents={savedEvents}
            showSaveButton={!!user}
          />
        ) : (
          <div className="text-center py-16">
            <div className="text-gray-400 mb-4">
              <Search className="h-16 w-16 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No events found
            </h3>
            <p className="text-gray-600">
              Try adjusting your search criteria or browse all events
            </p>
          </div>
        )}
      </motion.div>
    </div>
  );
}