export interface User {
  id: string;
  email: string;
  name: string;
  avatar_url?: string;
  bio?: string;
  preferred_categories: string[];
  preferred_locations: string[];
  created_at: string;
  is_organizer: boolean;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  category: string;
  location: string;
  venue: string;
  date: string;
  time: string;
  end_date?: string;
  end_time?: string;
  price: number;
  max_attendees: number;
  current_attendees: number;
  image_url: string;
  organizer_id: string;
  organizer: {
    name: string;
    avatar_url?: string;
  };
  is_live: boolean;
  is_featured: boolean;
  tags: string[];
  created_at: string;
  rating: number;
  review_count: number;
}

export interface Booking {
  id: string;
  event_id: string;
  user_id: string;
  quantity: number;
  total_amount: number;
  status: 'pending' | 'confirmed' | 'cancelled';
  booking_date: string;
  event: Event;
}

export interface Review {
  id: string;
  event_id: string;
  user_id: string;
  rating: number;
  comment: string;
  created_at: string;
  user: {
    name: string;
    avatar_url?: string;
  };
}

export interface SavedEvent {
  id: string;
  event_id: string;
  user_id: string;
  saved_at: string;
  event: Event;
}

export interface ChatMessage {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

export interface Notification {
  id: string;
  user_id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  read: boolean;
  created_at: string;
}