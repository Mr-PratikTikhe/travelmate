// ✅ CreateItinerary.js (fully working with backend)
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './CreateItinerary.css';

function CreateItinerary() {
  const [activities, setActivities] = useState(['']);
  const [formData, setFormData] = useState({
    title: '',
    startDate: '',
    endDate: '',
    destinations: '',
    notes: '',
    photos: []
  });
  const email = localStorage.getItem('userEmail');
  const API = 'http://localhost:5000/api/itinerary';

  const handleAddActivity = () => {
    setActivities([...activities, '']);
  };

  const handleActivityChange = (index, value) => {
    const updated = [...activities];
    updated[index] = value;
    setActivities(updated);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, photos: Array.from(e.target.files).map(file => file.name) });
  };

  const handleImageUpload = async (file) => {
  const formData = new FormData();
  formData.append('image', file);

  const res = await fetch('http://localhost:5000/api/upload/image', {
    method: 'POST',
    body: formData,
  });

  const data = await res.json();
  return data.url; // return Cloudinary URL
};


  const handleSubmit = async (e) => {
    e.preventDefault();
    const itinerary = {
      ...formData,
      destinations: formData.destinations.split(',').map(d => d.trim()),
      activities,
      createdBy: email
    };

    await fetch(API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(itinerary)
    });

    alert('Itinerary saved!');
  };

  return (
    <div className="create-itinerary">
      <nav className="navbar">
        <div className="logo">TravelMate</div>
        <ul className="nav-links">
          <li><Link to="/home">Home</Link></li>
          <li><Link to="/create">Create New</Link></li>
          <li><Link to="/profile">Profile</Link></li>
          <li><Link to="/">Logout</Link></li>
        </ul>
      </nav>

      <div className="form-container">
        <h2>Create Your Perfect Itinerary</h2>
        <form onSubmit={handleSubmit}>
          <label>Trip Title</label>
          <input name="title" type="text" value={formData.title} onChange={handleInputChange} placeholder="Enter your amazing trip title" />

          <label>Start Date</label>
          <input name="startDate" type="date" value={formData.startDate} onChange={handleInputChange} />

          <label>End Date</label>
          <input name="endDate" type="date" value={formData.endDate} onChange={handleInputChange} />

          <label>Destination(s)</label>
          <input name="destinations" type="text" value={formData.destinations} onChange={handleInputChange} placeholder="e.g. Paris, Tokyo, Bali" />

          <label>Activities & Experiences</label>
          {activities.map((activity, index) => (
            <div key={index} className="activity-input">
              <input
                type="text"
                placeholder={`Exciting activity ${index + 1}`}
                value={activity}
                onChange={(e) => handleActivityChange(index, e.target.value)}
              />
            </div>
          ))}
          <button type="button" onClick={handleAddActivity} className="add-button">
            ✨ Add More Adventures
          </button>

          <label>Travel Notes & Special Memories</label>
          <textarea name="notes" value={formData.notes} onChange={handleInputChange} placeholder="Share your thoughts, special requirements, or memorable moments you want to capture..."></textarea>

          <label>Upload Your Journey Photos</label>
          <input type="file" multiple accept="image/*" onChange={handleFileChange} />

          <button type="submit" className="save-button">
            Save My Dream Itinerary
          </button>
        </form>
      </div>

      <footer className="footer">
        <p>&copy; 2025 TravelMate. Crafting extraordinary journeys worldwide.</p>
      </footer>
    </div>
  );
}

export default CreateItinerary;
