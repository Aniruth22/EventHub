const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const User = require('../models/User');

// @route   POST /api/users/request-host
// @desc    User requests to become a host
// @access  Private
router.post('/request-host', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }
    
    user.hostRequestStatus = 'pending';
    await user.save();
    
    res.json({ msg: 'Your request to become a host has been submitted for review.', user });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;