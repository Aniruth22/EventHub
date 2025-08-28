import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, TrendingUp, Users, Star, ArrowRight, Sparkles } from 'lucide-react';
import { mockEvents } from '../data/mockData';
import { useAuth } from '../contexts/AuthContext';
import { EventGrid } from '../components/events/EventGrid';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';

export function Home() {
  const { user } = useAuth();
  const [savedEvents, setSavedEvents] = useState<string[]>([]);
  
  const featuredEvents = mockEvents.filter(event => event.is_featured);
  const recommendedEvents = user 
    ? mockEvents.filter(event => 
        user.preferred_categories.includes(event.category) ||
        user.preferred_locations.some(loc => event.location.includes(loc))
      ).slice(0, 3)
    : mockEvents.slice(0, 3);

  const handleSaveEvent = (eventId: string) => {
    setSavedEvents(prev => 
      prev.includes(eventId) 
        ? prev.filter(id => id !== eventId)
        : [...prev, eventId]
    );
  };

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-purple-900 via-purple-800 to-teal-800 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight">
              Discover Amazing
              <span className="block bg-gradient-to-r from-orange-400 to-pink-400 bg-clip-text text-transparent">
                Events
              </span>
            </h1>
            <p className="text-xl lg:text-2xl mb-8 text-purple-100 max-w-3xl mx-auto leading-relaxed">
              Connect with your community through unforgettable experiences. From concerts to conferences, find your perfect event.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/events">
                <Button size="lg" className="bg-orange-600 hover:bg-orange-700">
                  Explore Events
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              {!user && (
                <Link to="/signup">
                  <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-purple-800">
                    Join EventHub
                  </Button>
                </Link>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: Calendar, value: '10K+', label: 'Events Hosted', color: 'text-purple-600' },
            { icon: Users, value: '500K+', label: 'Happy Attendees', color: 'text-teal-600' },
            { icon: Star, value: '4.9', label: 'Average Rating', color: 'text-orange-600' },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="text-center p-8">
                <stat.icon className={`h-12 w-12 ${stat.color} mx-auto mb-4`} />
                <div className="text-4xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Featured Events */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Events</h2>
          <p className="text-xl text-gray-600">Don't miss these amazing experiences</p>
        </motion.div>
        <EventGrid 
          events={featuredEvents} 
          onSaveEvent={handleSaveEvent}
          savedEvents={savedEvents}
          showSaveButton={!!user}
        />
      </section>

      {/* AI Recommendations */}
      {user && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-r from-purple-50 to-teal-50 rounded-2xl p-8"
          >
            <div className="text-center mb-8">
              <div className="flex items-center justify-center mb-4">
                <Sparkles className="h-8 w-8 text-purple-600 mr-3" />
                <h2 className="text-3xl font-bold text-gray-900">For You</h2>
              </div>
              <p className="text-lg text-gray-600">
                Personalized recommendations based on your preferences
              </p>
            </div>
            <EventGrid 
              events={recommendedEvents} 
              onSaveEvent={handleSaveEvent}
              savedEvents={savedEvents}
            />
            <div className="text-center mt-8">
              <Link to="/events">
                <Button variant="primary" size="lg">
                  View All Recommendations
                  <TrendingUp className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </section>
      )}

      {/* Call to Action */}
      <section className="bg-gradient-to-r from-purple-600 to-teal-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-4xl font-bold mb-4">Ready to Create Your Event?</h2>
            <p className="text-xl mb-8 text-purple-100 max-w-2xl mx-auto">
              Join thousands of organizers who trust EventHub to bring their events to life
            </p>
            {user ? (
              <Link to="/dashboard">
                <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100">
                  Go to Dashboard
                </Button>
              </Link>
            ) : (
              <Link to="/signup">
                <Button size="lg" className="bg-orange-600 hover:bg-orange-700">
                  Get Started
                </Button>
              </Link>
            )}
          </motion.div>
        </div>
      </section>
    </div>
  );
}