const express = require('express');
const router = express.Router();
const Itinerary = require('../models/Itinerary');

// Create
router.post('/', async (req, res) => {
  try {
    const itinerary = new Itinerary(req.body);
    const saved = await itinerary.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all by user email
router.get('/user/:email', async (req, res) => {
  try {
    const itineraries = await Itinerary.find({ createdBy: req.params.email });
    res.json(itineraries);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get one by ID
router.get('/:id', async (req, res) => {
  try {
    const itinerary = await Itinerary.findById(req.params.id);
    res.json(itinerary);
  } catch (err) {
    res.status(404).json({ error: 'Itinerary not found' });
  }
});

// Delete
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Itinerary.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Not found' });
    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
