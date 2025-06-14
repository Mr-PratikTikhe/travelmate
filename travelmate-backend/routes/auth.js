const express = require('express');
const router = express.Router();
const User = require('../models/user');

// Register user
router.post('/register', async (req, res) => {
  try {
    const { email } = req.body;
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json("Email already registered.");
    const user = new User(req.body);
    await user.save();
    res.status(201).json({ email: user.email });
  } catch (err) {
    res.status(500).json(err.message);
  }
});

// Login user
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email, password });
    if (!user) return res.status(400).json("Invalid credentials");
    res.json({ email: user.email });
  } catch (err) {
    res.status(500).json(err.message);
  }
});

// Get user by email
router.get('/user/:email', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email });
    if (!user) return res.status(404).json("User not found");
    res.json(user);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

// Update user by email
router.put('/user/:email', async (req, res) => {
  try {
    const updated = await User.findOneAndUpdate(
      { email: req.params.email },
      { $set: req.body },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

module.exports = router;
