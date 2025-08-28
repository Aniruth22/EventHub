import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Settings, Heart, Calendar, MapPin, CreditCard, Bell } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { categories, locations } from '../data/mockData';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card } from '../components/ui/Card';

export function Profile() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    bio: user?.bio || '',
    preferred_categories: user?.preferred_categories || [],
    preferred_locations: user?.preferred_locations || [],
  });

  const tabs = [
    { id: 'profile', name: 'Profile', icon: User },
    { id: 'preferences', name: 'Preferences', icon: Heart },
    { id: 'bookings', name: 'Bookings', icon: Calendar },
    { id: 'payments', name: 'Payments', icon: CreditCard },
    { id: 'notifications', name: 'Notifications', icon: Bell },
  ];

  const handleCategoryToggle = (categoryId: string) => {
    setFormData(prev => ({
      ...prev,
      preferred_categories: prev.preferred_categories.includes(categoryId)
        ? prev.preferred_categories.filter(id => id !== categoryId)
        : [...prev.preferred_categories, categoryId],
    }));
  };

  const handleLocationToggle = (location: string) => {
    setFormData(prev => ({
      ...prev,
      preferred_locations: prev.preferred_locations.includes(location)
        ? prev.preferred_locations.filter(loc => loc !== location)
        : [...prev.preferred_locations, location],
    }));
  };

  const handleSave = () => {
    // In a real app, this would save to the backend
    console.log('Saving profile:', formData);
    alert('Profile updated successfully!');
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Please sign in</h2>
          <p className="text-gray-600 mb-6">You need to be logged in to view your profile</p>
          <Button>Sign In</Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
        <p className="text-gray-600 mt-2">Manage your account and preferences</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <Card className="p-6">
            {/* User Avatar */}
            <div className="text-center mb-6">
              {user.avatar_url ? (
                <img
                  src={user.avatar_url}
                  alt={user.name}
                  className="w-20 h-20 rounded-full mx-auto mb-4 object-cover"
                />
              ) : (
                <div className="w-20 h-20 bg-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <User className="h-10 w-10 text-white" />
                </div>
              )}
              <h3 className="text-lg font-semibold text-gray-900">{user.name}</h3>
              <p className="text-gray-600 text-sm">{user.email}</p>
            </div>

            {/* Navigation */}
            <nav className="space-y-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center px-3 py-2 text-left rounded-lg transition-colors duration-200 ${
                    activeTab === tab.id
                      ? 'bg-purple-100 text-purple-700 font-medium'
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                  }`}
                >
                  <tab.icon className="h-5 w-5 mr-3" />
                  {tab.name}
                </button>
              ))}
            </nav>
          </Card>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          <Card className="p-8">
            {activeTab === 'profile' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Profile Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input
                    label="Full Name"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  />
                  <Input
                    label="Email Address"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  />
                </div>
                <div className="mt-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
                  <textarea
                    value={formData.bio}
                    onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
                    placeholder="Tell us about yourself..."
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
                <div className="mt-8">
                  <Button onClick={handleSave}>Save Changes</Button>
                </div>
              </div>
            )}

            {activeTab === 'preferences' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Event Preferences</h2>
                
                {/* Categories */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Favorite Categories</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {categories.map((category) => (
                      <motion.button
                        key={category.id}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleCategoryToggle(category.id)}
                        className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                          formData.preferred_categories.includes(category.id)
                            ? 'border-purple-600 bg-purple-50 text-purple-800'
                            : 'border-gray-300 bg-white text-gray-700 hover:border-purple-300'
                        }`}
                      >
                        <div className="text-2xl mb-2">{category.icon}</div>
                        <div className="text-sm font-medium">{category.name}</div>
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Locations */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Preferred Locations</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {locations.map((location) => (
                      <motion.button
                        key={location}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleLocationToggle(location)}
                        className={`p-3 rounded-lg border-2 transition-all duration-200 text-sm font-medium ${
                          formData.preferred_locations.includes(location)
                            ? 'border-teal-600 bg-teal-50 text-teal-800'
                            : 'border-gray-300 bg-white text-gray-700 hover:border-teal-300'
                        }`}
                      >
                        <MapPin className="h-4 w-4 inline mr-2" />
                        {location}
                      </motion.button>
                    ))}
                  </div>
                </div>

                <Button onClick={handleSave}>Save Preferences</Button>
              </div>
            )}

            {activeTab === 'bookings' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">My Bookings</h2>
                <div className="space-y-4">
                  {mockEvents.slice(0, 3).map((event) => (
                    <div key={event.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-semibold text-gray-900">{event.title}</h4>
                          <p className="text-gray-600 text-sm">{event.date} at {event.time}</p>
                          <p className="text-gray-600 text-sm">{event.venue}, {event.location}</p>
                        </div>
                        <div className="text-right">
                          <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-semibold">
                            Confirmed
                          </span>
                          <p className="text-gray-900 font-semibold mt-1">${event.price}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'payments' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Payment History</h2>
                <div className="space-y-4">
                  {[
                    { event: 'Tech Summit 2025', amount: 299, date: '2024-12-15', status: 'Completed' },
                    { event: 'Cooking Workshop', amount: 85, date: '2024-12-10', status: 'Completed' },
                    { event: 'Art Gallery Opening', amount: 25, date: '2024-12-05', status: 'Completed' },
                  ].map((payment, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-semibold text-gray-900">{payment.event}</h4>
                          <p className="text-gray-600 text-sm">{payment.date}</p>
                        </div>
                        <div className="text-right">
                          <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-semibold">
                            {payment.status}
                          </span>
                          <p className="text-gray-900 font-semibold mt-1">${payment.amount}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'notifications' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Notification Settings</h2>
                <div className="space-y-6">
                  {[
                    { id: 'email_events', label: 'Event Recommendations', description: 'Get personalized event suggestions via email' },
                    { id: 'push_reminders', label: 'Event Reminders', description: 'Receive push notifications for upcoming events' },
                    { id: 'email_updates', label: 'Event Updates', description: 'Get notified about changes to your saved events' },
                    { id: 'marketing', label: 'Marketing Communications', description: 'Receive newsletters and promotional content' },
                  ].map((setting) => (
                    <div key={setting.id} className="flex items-start justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{setting.label}</h4>
                        <p className="text-gray-600 text-sm mt-1">{setting.description}</p>
                      </div>
                      <div className="ml-4">
                        <input
                          type="checkbox"
                          defaultChecked
                          className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-8">
                  <Button>Save Settings</Button>
                </div>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}