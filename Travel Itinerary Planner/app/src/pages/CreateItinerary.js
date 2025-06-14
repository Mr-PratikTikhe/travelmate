import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './CreateItinerary.css';

const API = process.env.REACT_APP_API_URL;

function CreateItinerary() {
  const navigate = useNavigate();
  const email = localStorage.getItem('userEmail');

  const [activities, setActivities] = useState(['']);
  const [formData, setFormData] = useState({
    title: '',
    startDate: '',
    endDate: '',
    destinations: '',
    notes: '',
    photos: []
  });

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

  const handleFileChange = async (e) => {
    const files = Array.from(e.target.files);
    const urls = [];

    for (let file of files) {
      const data = new FormData();
      data.append('image', file);

      try {
        const res = await fetch(`${API}/upload/image`, {
          method: 'POST',
          body: data
        });

        const json = await res.json();
        if (json.url) urls.push(json.url);
      } catch (err) {
        console.error('Image upload failed:', err);
      }
    }

    setFormData((prev) => ({ ...prev, photos: urls }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const itinerary = {
      ...formData,
      destinations: formData.destinations.split(',').map(d => d.trim()),
      activities,
      createdBy: email
    };

    try {
      await fetch(`${API}/itinerary`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(itinerary)
      });

      alert('Itinerary saved!');
      navigate('/home');
    } catch (err) {
      alert('Failed to save itinerary.');
    }
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
          <textarea name="notes" value={formData.notes} onChange={handleInputChange} placeholder="Share your thoughts or memories..."></textarea>

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
