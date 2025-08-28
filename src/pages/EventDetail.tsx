import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Calendar, MapPin, Users, Star, Share2, Heart, CreditCard, 
  MessageSquare, ChevronLeft, Clock, Tag, User
} from 'lucide-react';
import { mockEvents, mockReviews } from '../data/mockData';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { format } from 'date-fns';

export function EventDetail() {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const [quantity, setQuantity] = useState(1);
  const [saved, setSaved] = useState(false);
  const [showBooking, setShowBooking] = useState(false);

  const event = mockEvents.find(e => e.id === id);
  const eventReviews = mockReviews.filter(review => review.event_id === id);

  if (!event) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Event not found</h2>
          <Link to="/events">
            <Button>Browse Events</Button>
          </Link>
        </Card>
      </div>
    );
  }

  const formattedDate = format(new Date(event.date), 'EEEE, MMMM do, yyyy');
  const totalPrice = event.price * quantity;

  const handleBooking = () => {
    if (!user) {
      alert('Please sign in to book tickets');
      return;
    }
    setShowBooking(true);
  };

  const confirmBooking = () => {
    // Mock booking process
    alert(`Successfully booked ${quantity} ticket(s) for ${event.title}!`);
    setShowBooking(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Back Button */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <Link to="/events" className="inline-flex items-center text-gray-600 hover:text-purple-600 transition-colors duration-200">
          <ChevronLeft className="h-4 w-4 mr-1" />
          Back to Events
        </Link>
      </div>

      {/* Hero Image */}
      <div className="relative h-96 overflow-hidden">
        <img
          src={event.image_url}
          alt={event.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        {event.is_live && (
          <div className="absolute top-6 left-6">
            <span className="bg-red-600 text-white px-4 py-2 rounded-full text-sm font-semibold flex items-center">
              <span className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse"></span>
              LIVE NOW
            </span>
          </div>
        )}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Event Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card className="p-8">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex-1">
                    <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-semibold capitalize mb-4 inline-block">
                      {event.category}
                    </span>
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">{event.title}</h1>
                    <div className="flex items-center space-x-4 text-gray-600 mb-4">
                      <div className="flex items-center">
                        <Star className="h-5 w-5 text-yellow-500 fill-current mr-1" />
                        <span className="font-medium">{event.rating}</span>
                        <span className="ml-1">({event.review_count} reviews)</span>
                      </div>
                      <div className="flex items-center">
                        <User className="h-4 w-4 mr-1" />
                        <span>{event.organizer.name}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-3">
                    <button
                      onClick={() => setSaved(!saved)}
                      className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors duration-200"
                    >
                      <Heart className={`h-5 w-5 ${saved ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
                    </button>
                    <button className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors duration-200">
                      <Share2 className="h-5 w-5 text-gray-600" />
                    </button>
                  </div>
                </div>

                {/* Event Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="space-y-4">
                    <div className="flex items-center text-gray-700">
                      <Calendar className="h-5 w-5 mr-3 text-purple-600" />
                      <div>
                        <div className="font-medium">{formattedDate}</div>
                        <div className="text-sm text-gray-600">{event.time} - {event.end_time || 'TBD'}</div>
                      </div>
                    </div>
                    <div className="flex items-center text-gray-700">
                      <MapPin className="h-5 w-5 mr-3 text-purple-600" />
                      <div>
                        <div className="font-medium">{event.venue}</div>
                        <div className="text-sm text-gray-600">{event.location}</div>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center text-gray-700">
                      <Users className="h-5 w-5 mr-3 text-purple-600" />
                      <div>
                        <div className="font-medium">{event.current_attendees} attending</div>
                        <div className="text-sm text-gray-600">{event.max_attendees} max capacity</div>
                      </div>
                    </div>
                    <div className="flex items-center text-gray-700">
                      <Tag className="h-5 w-5 mr-3 text-purple-600" />
                      <div>
                        <div className="font-medium">${event.price}</div>
                        <div className="text-sm text-gray-600">per ticket</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">About This Event</h3>
                  <p className="text-gray-700 leading-relaxed">{event.description}</p>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {event.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </Card>
            </motion.div>

            {/* Reviews */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="p-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">
                  Reviews ({eventReviews.length})
                </h3>
                <div className="space-y-6">
                  {eventReviews.map((review) => (
                    <div key={review.id} className="flex space-x-4">
                      <img
                        src={review.user.avatar_url || 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg'}
                        alt={review.user.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium text-gray-900">{review.user.name}</h4>
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
                                  i < review.rating ? 'text-yellow-500 fill-current' : 'text-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-gray-700">{review.comment}</p>
                        <p className="text-gray-500 text-sm mt-2">
                          {format(new Date(review.created_at), 'MMM dd, yyyy')}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="sticky top-24"
            >
              <Card className="p-6">
                <div className="text-center mb-6">
                  <div className="text-3xl font-bold text-gray-900">${event.price}</div>
                  <div className="text-gray-600">per ticket</div>
                </div>

                {!showBooking ? (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Number of tickets
                      </label>
                      <select
                        value={quantity}
                        onChange={(e) => setQuantity(Number(e.target.value))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      >
                        {[...Array(10)].map((_, i) => (
                          <option key={i + 1} value={i + 1}>
                            {i + 1} {i === 0 ? 'ticket' : 'tickets'}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="border-t border-gray-200 pt-4">
                      <div className="flex justify-between items-center text-lg font-semibold">
                        <span>Total:</span>
                        <span>${totalPrice}</span>
                      </div>
                    </div>

                    <Button className="w-full" size="lg" onClick={handleBooking}>
                      <CreditCard className="h-5 w-5 mr-2" />
                      Book Now
                    </Button>

                    <div className="text-center text-sm text-gray-600">
                      Free cancellation up to 24 hours before the event
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <h4 className="font-semibold text-gray-900">Booking Summary</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Tickets ({quantity}x)</span>
                        <span>${event.price * quantity}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Service fee</span>
                        <span>$5</span>
                      </div>
                      <div className="border-t pt-2 flex justify-between font-semibold">
                        <span>Total</span>
                        <span>${totalPrice + 5}</span>
                      </div>
                    </div>
                    <Button className="w-full" onClick={confirmBooking}>
                      Confirm Booking
                    </Button>
                    <Button variant="outline" className="w-full" onClick={() => setShowBooking(false)}>
                      Back
                    </Button>
                  </div>
                )}

                {/* Event Stats */}
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-purple-600">{event.current_attendees}</div>
                      <div className="text-gray-600 text-sm">Attendees</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-teal-600">{event.review_count}</div>
                      <div className="text-gray-600 text-sm">Reviews</div>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}