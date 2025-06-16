const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const itineraryRoutes = require('./routes/itinerary');
const uploadRoutes = require('./routes/uplod');

const app = express();

// ✅ CORS setup for Netlify (and localhost during development)
app.use(cors({
  origin: [
    'https://travelitnerary.netlify.app', // Netlify live site
    'http://localhost:3000'               // local dev
  ],
  credentials: true
}));

app.use(express.json());

// ✅ Basic health check route
app.get('/api/ping', (req, res) => {
  res.send({ status: 'Backend is running 🎉' });
});

// ✅ Register API routes
app.use('/api/auth', authRoutes);
app.use('/api/itinerary', itineraryRoutes);
app.use('/api/upload', uploadRoutes);

// ✅ MongoDB connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
  });
})
.catch((err) => {
  console.error('❌ MongoDB connection error:', err);
});

module.exports = app;
