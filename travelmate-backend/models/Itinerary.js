const mongoose = require('mongoose');

const itinerarySchema = new mongoose.Schema({
  createdBy: { type: String, required: true }, // or ObjectId if needed
  title: String,
  startDate: String,
  endDate: String,
  destinations: [String],
  activities: [String],
  notes: String,
  photos: [String],
});

module.exports = mongoose.model('Itinerary', itinerarySchema);