const mongoose = require('mongoose');

const itinerarySchema = new mongoose.Schema({
  title: String,
  startDate: String,
  endDate: String,
  destinations: [String],
  activities: [String],
  notes: String,
  photos: [String],
  createdBy: String
});

module.exports = mongoose.model('Itinerary', itinerarySchema);
