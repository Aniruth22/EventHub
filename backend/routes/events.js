const express = require('express');
const router = express.Router();
const Event = require('../models/Event');

// @route   POST /api/events
// @desc    Create a new event
router.post('/', async (req, res) => {
  try {
    const newEvent = new Event({
      ...req.body,
      status: 'Approved', // Auto-approve for now for testing purposes
    });
    const event = await newEvent.save();
    res.status(201).json(event);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET /api/events
// @desc    Get all approved events
router.get('/', async (req, res) => {
  try {
    const events = await Event.find({ status: 'Approved' }).sort({ date: 1 });
    res.json(events);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET /api/events/live
// @desc    Get all approved events happening today
router.get('/live', async (req, res) => {
  try {
    const today = new Date();
    const startOfDay = new Date(today.setHours(0, 0, 0, 0));
    const endOfDay = new Date(today.setHours(23, 59, 59, 999));

    const events = await Event.find({
      status: 'Approved',
      date: { $gte: startOfDay, $lte: endOfDay }
    }).sort({ date: 1 });
    res.json(events);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET /api/events/weekend
// @desc    Get all approved events happening this weekend
router.get('/weekend', async (req, res) => {
  try {
    const today = new Date();
    const dayOfWeek = today.getDay(); // Sunday = 0, ... , Saturday = 6

    // Logic to find the start of the upcoming weekend (Friday)
    const nextFriday = new Date(today);
    nextFriday.setDate(today.getDate() + (5 - dayOfWeek + 7) % 7);
    nextFriday.setHours(0, 0, 0, 0);

    // Logic to find the end of the upcoming weekend (Sunday)
    const nextSunday = new Date(nextFriday);
    nextSunday.setDate(nextFriday.getDate() + 2);
    nextSunday.setHours(23, 59, 59, 999);

    const events = await Event.find({
      status: 'Approved',
      date: { $gte: nextFriday, $lte: nextSunday }
    }).sort({ date: 1 });
    res.json(events);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET /api/events/:id
// @desc    Get a single event by its ID
router.get('/:id', async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ msg: 'Event not found' });
    }
    res.json(event);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;