import React from 'react';
import { motion } from 'framer-motion';
import { Event } from '../../types';
import { EventCard } from './EventCard';

interface EventGridProps {
  events: Event[];
  onSaveEvent?: (eventId: string) => void;
  savedEvents?: string[];
  showSaveButton?: boolean;
}

export function EventGrid({ events, onSaveEvent, savedEvents = [], showSaveButton = true }: EventGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {events.map((event, index) => (
        <motion.div
          key={event.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <EventCard
            event={event}
            onSave={onSaveEvent}
            saved={savedEvents.includes(event.id)}
            showSaveButton={showSaveButton}
          />
        </motion.div>
      ))}
    </div>
  );
}