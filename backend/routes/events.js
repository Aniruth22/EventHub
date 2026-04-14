const express = require('express');
const router = express.Router();
const Event = require('../models/Event');
const User = require('../models/User');
const auth = require('../middleware/authMiddleware');
const checkRole = require('../middleware/roleMiddleware');

// @route   POST /api/events
// @desc    Create a new event
// @access  Private (Host or Admin only)
router.post('/', auth, checkRole(['host', 'admin']), async (req, res) => {
  try {
    const newEvent = new Event({
      ...req.body,
      host: req.user.id, // Associate the event with the logged-in user
      status: 'Pending', // All new events must be approved by an admin
    });
    const event = await newEvent.save();
    res.status(201).json(event);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET /api/events
// @desc    Get all publicly approved events
// @access  Public
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
// @access  Public
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
// @access  Public
router.get('/weekend', async (req, res) => {
  try {
    const today = new Date();
    const dayOfWeek = today.getDay();
    const nextFriday = new Date(today);
    nextFriday.setDate(today.getDate() + (5 - dayOfWeek + 7) % 7);
    nextFriday.setHours(0, 0, 0, 0);
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

// @route   GET /api/events/following
// @desc    Get events from hosts the user follows
// @access  Private
router.get('/following', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (user.following.length === 0) {
            return res.json([]);
        }
        const events = await Event.find({
            'host': { $in: user.following },
            'status': 'Approved'
        }).sort({ date: -1 });
        res.json(events);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   GET /api/events/pending
// @desc    Get all events awaiting approval
// @access  Private (Admin only)
router.get('/pending', auth, checkRole(['admin']), async (req, res) => {
  try {
    const pendingEvents = await Event.find({ status: 'Pending' }).sort({ date: 1 });
    res.json(pendingEvents);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   PUT /api/events/approve/:id
// @desc    Approve or reject an event
// @access  Private (Admin only)
router.put('/approve/:id', auth, checkRole(['admin']), async (req, res) => {
  try {
    const { status } = req.body; // Expecting { "status": "Approved" } or { "status": "Rejected" }
    if (status !== 'Approved' && status !== 'Rejected') {
      return res.status(400).json({ msg: 'Invalid status update.' });
    }
    const event = await Event.findByIdAndUpdate(
      req.params.id,
      { status: status },
      { new: true }
    );
    if (!event) {
      return res.status(404).json({ msg: 'Event not found' });
    }
    res.json(event);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET /api/events/:id
// @desc    Get a single event by its ID
// @access  Public
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