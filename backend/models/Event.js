const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, required: true },
  timeSlots: { type: String, required: true },
  location: { type: String, required: true },
  category: { type: String, required: true },
  image: { type: String, required: true }, // URL to the poster image
  ticketPrice: { type: Number, required: true },
  capacity: { type: Number, required: true }, // Number of people allowed
  prizeMoney: { type: String }, // For competitive events
  status: {
    type: String,
    enum: ['Pending', 'Approved', 'Rejected'],
    default: 'Pending'
  }
});

module.exports = mongoose.model('Event', EventSchema);