import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, BarChart3, Users, DollarSign, Calendar, Settings, Eye } from 'lucide-react';
import { mockEvents } from '../data/mockData';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { EventCard } from '../components/events/EventCard';

export function Dashboard() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  
  // Mock organizer events
  const organizerEvents = mockEvents.slice(0, 3);

  const tabs = [
    { id: 'overview', name: 'Overview', icon: BarChart3 },
    { id: 'events', name: 'My Events', icon: Calendar },
    { id: 'analytics', name: 'Analytics', icon: BarChart3 },
    { id: 'settings', name: 'Settings', icon: Settings },
  ];

  const stats = [
    { label: 'Total Events', value: '12', icon: Calendar, color: 'text-purple-600' },
    { label: 'Total Attendees', value: '2,435', icon: Users, color: 'text-teal-600' },
    { label: 'Revenue', value: '$24,350', icon: DollarSign, color: 'text-green-600' },
    { label: 'Avg Rating', value: '4.8', icon: BarChart3, color: 'text-orange-600' },
  ];

  if (!user?.is_organizer) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Organizer Access Required</h2>
          <p className="text-gray-600 mb-6">You need organizer permissions to access this dashboard</p>
          <Button>Request Organizer Access</Button>
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
            <h1 className="text-3xl font-bold text-gray-900">Organizer Dashboard</h1>
            <p className="text-gray-600 mt-2">Manage your events and track performance</p>
          </div>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Create Event
          </Button>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
      >
        {stats.map((stat, index) => (
          <Card key={index} className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">{stat.label}</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
              </div>
              <stat.icon className={`h-8 w-8 ${stat.color}`} />
            </div>
          </Card>
        ))}
      </motion.div>

      {/* Navigation Tabs */}
      <div className="border-b border-gray-200 mb-8">
        <nav className="flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                activeTab === tab.id
                  ? 'border-purple-600 text-purple-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <tab.icon className="h-4 w-4 inline mr-2" />
              {tab.name}
            </button>
          ))}
        </nav>
      </div>

      {/* Content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {activeTab === 'overview' && (
          <div className="space-y-8">
            <Card className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Recent Activity</h3>
              <div className="space-y-4">
                {[
                  { action: 'New booking for Tech Summit 2025', time: '2 hours ago', type: 'booking' },
                  { action: 'Event "Cooking Workshop" was reviewed', time: '4 hours ago', type: 'review' },
                  { action: 'Payment received for Art Gallery Opening', time: '1 day ago', type: 'payment' },
                ].map((activity, index) => (
                  <div key={index} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
                    <div>
                      <p className="text-gray-900 font-medium">{activity.action}</p>
                      <p className="text-gray-500 text-sm">{activity.time}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      activity.type === 'booking' ? 'bg-blue-100 text-blue-800' :
                      activity.type === 'review' ? 'bg-green-100 text-green-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {activity.type}
                    </span>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}

        {activeTab === 'events' && (
          <div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {organizerEvents.map((event) => (
                <div key={event.id} className="relative">
                  <EventCard event={event} showSaveButton={false} />
                  <div className="absolute top-4 right-4 bg-white rounded-lg shadow-lg p-2">
                    <button className="p-2 text-gray-600 hover:text-purple-600 transition-colors duration-200">
                      <Eye className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Event Performance</h3>
              <div className="text-center py-16 text-gray-500">
                <BarChart3 className="h-16 w-16 mx-auto mb-4 opacity-50" />
                <p>Analytics dashboard coming soon</p>
              </div>
            </Card>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Organizer Settings</h3>
              <div className="text-center py-16 text-gray-500">
                <Settings className="h-16 w-16 mx-auto mb-4 opacity-50" />
                <p>Settings panel coming soon</p>
              </div>
            </Card>
          </div>
        )}
      </motion.div>
    </div>
  );
}