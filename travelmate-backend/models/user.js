const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: String,
  firstName: String,
  lastName: String,
  email: { type: String, unique: true },
  password: String,
  travelStyle: String,
  location: String,
  birthDate: String,
  phone: String,
  joined: { type: String, default: new Date().toISOString().split('T')[0] },
  languages: String,
  favoriteDestination: String,
  bio: String,
  totalTrips: { type: Number, default: 0 },
  countriesVisited: { type: Number, default: 0 },
  milesFlown: { type: Number, default: 0 }
});

module.exports = mongoose.model('User', UserSchema);
