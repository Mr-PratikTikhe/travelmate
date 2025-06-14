const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// Import route files
const authRoutes = require('./routes/auth');
const itineraryRoutes = require('./routes/itinerary');
const uploadRoutes = require('./routes/uplod');

const app = express();

// ✅ CORS configuration to allow Netlify frontend
app.use(cors({
  origin: ['https://travelitnerary.netlify.app'], // your live frontend URL
  credentials: true
}));

// Middleware to parse JSON requests
app.use(express.json());

// Register API Routes
app.use('/api/auth', authRoutes);
app.use('/api/itinerary', itineraryRoutes);
app.use('/api/upload', uploadRoutes);

// MongoDB Connection + Server Start
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
