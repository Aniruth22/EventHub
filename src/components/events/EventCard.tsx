import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Users, Star, Heart } from 'lucide-react';
import { Event } from '../../types';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { format } from 'date-fns';

interface EventCardProps {
  event: Event;
  onSave?: (eventId: string) => void;
  saved?: boolean;
  showSaveButton?: boolean;
}

export function EventCard({ event, onSave, saved = false, showSaveButton = true }: EventCardProps) {
  const formattedDate = format(new Date(event.date), 'MMM dd, yyyy');
  const attendeePercentage = (event.current_attendees / event.max_attendees) * 100;

  return (
    <Card hover className="overflow-hidden">
      {/* Event Image */}
      <div className="relative">
        <img
          src={event.image_url}
          alt={event.title}
          className="w-full h-48 object-cover"
        />
        {event.is_live && (
          <div className="absolute top-3 left-3">
            <span className="bg-red-600 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center">
              <span className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse"></span>
              LIVE
            </span>
          </div>
        )}
        {event.is_featured && (
          <div className="absolute top-3 right-3">
            <span className="bg-orange-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
              Featured
            </span>
          </div>
        )}
        {showSaveButton && (
          <button
            onClick={() => onSave?.(event.id)}
            className="absolute bottom-3 right-3 p-2 bg-white rounded-full shadow-lg hover:bg-gray-50 transition-colors duration-200"
          >
            <Heart className={`h-5 w-5 ${saved ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
          </button>
        )}
      </div>

      {/* Event Details */}
      <div className="p-6">
        {/* Category Badge */}
        <div className="flex justify-between items-start mb-3">
          <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-xs font-semibold capitalize">
            {event.category}
          </span>
          <div className="flex items-center text-yellow-500">
            <Star className="h-4 w-4 fill-current" />
            <span className="text-gray-600 text-sm ml-1">{event.rating}</span>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
          {event.title}
        </h3>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {event.description}
        </p>

        {/* Event Info */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-gray-600 text-sm">
            <Calendar className="h-4 w-4 mr-2" />
            {formattedDate} at {event.time}
          </div>
          <div className="flex items-center text-gray-600 text-sm">
            <MapPin className="h-4 w-4 mr-2" />
            {event.venue}, {event.location}
          </div>
          <div className="flex items-center text-gray-600 text-sm">
            <Users className="h-4 w-4 mr-2" />
            {event.current_attendees} / {event.max_attendees} attendees
          </div>
        </div>

        {/* Attendance Progress */}
        <div className="mb-4">
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm text-gray-600">Attendance</span>
            <span className="text-sm text-gray-600">{Math.round(attendeePercentage)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-purple-600 to-teal-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${attendeePercentage}%` }}
            ></div>
          </div>
        </div>

        {/* Price and Action */}
        <div className="flex justify-between items-center">
          <div>
            <span className="text-2xl font-bold text-gray-900">
              ${event.price}
            </span>
            <span className="text-gray-600 text-sm ml-1">per ticket</span>
          </div>
          <Link to={`/events/${event.id}`}>
            <Button variant="primary" size="sm">
              View Details
            </Button>
          </Link>
        </div>
      </div>
    </Card>
  );
}