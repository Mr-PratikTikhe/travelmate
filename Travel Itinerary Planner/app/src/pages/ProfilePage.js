

import React, { useState, useEffect } from 'react';
import './ProfilePage.css';
import { Link } from 'react-router-dom';
const API = process.env.REACT_APP_API_URL;
fetch(`${API}/auth/register`)


function ProfilePage() {
  const userEmail = localStorage.getItem('userEmail');
  const [profile, setProfile] = useState(null);
  const [formState, setFormState] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const API = 'http://localhost:5000/api/auth';

  useEffect(() => {
    fetch(`${API}/user/${userEmail}`)
      .then(res => res.json())
      .then(data => {
        const fullProfile = {
          ...data,
          name: `${data.firstName || ''} ${data.lastName || ''}`.trim(),
          phone: data.phone || '',
          favoriteDestination: data.favoriteDestination || '',
          languages: data.languages || '',
          joined: data.joined || new Date().toISOString().split('T')[0],
          totalTrips: data.totalTrips || 0,
          countriesVisited: data.countriesVisited || 0,
          milesFlown: data.milesFlown || 0,
          bio: data.bio || ''
        };
        setProfile(fullProfile);
        setFormState(fullProfile);
      });
  }, [userEmail]);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    setFormState({ ...profile });
  };

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    const updated = {
      ...formState,
      firstName: formState.name.split(' ')[0],
      lastName: formState.name.split(' ').slice(1).join(' ')
    };

    await fetch(`${API}/user/${userEmail}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updated)
    });

    setProfile(updated);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormState({ ...profile });
    setIsEditing(false);
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    alert('Profile link copied to clipboard! Share your travel adventures with friends.');
  };

  const handleExportData = () => {
    const dataStr = JSON.stringify(profile, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'travel_profile.json';
    link.click();
  };

  const getInitials = (name) => {
    return name?.split(' ').map(word => word[0]).join('').toUpperCase();
  };

  const recentTrips = [
    {
      id: 1,
      name: 'Tokyo Adventure',
      date: 'Dec 2024',
      description: 'Explored traditional temples, modern skyscrapers, and incredible street food culture.'
    },
    {
      id: 2,
      name: 'Barcelona Getaway',
      date: 'Oct 2024',
      description: "Discovered Gaudí's masterpieces, enjoyed tapas tours, and relaxed on beautiful beaches."
    },
    {
      id: 3,
      name: 'Iceland Road Trip',
      date: 'Aug 2024',
      description: 'Witnessed the Northern Lights, explored geysers, and soaked in natural hot springs.'
    },
    {
      id: 4,
      name: 'Morocco Cultural Tour',
      date: 'Jun 2024',
      description: 'Wandered through colorful markets, stayed in traditional riads, and crossed the Sahara.'
    }
  ];

  if (!profile) return <div>Loading profile...</div>;

  return (
    <div>
      <nav className="navbar">
        <div className="logo">TravelMate</div>
        <ul className="nav-links">
          <li><Link to="/home">Home</Link></li>
          <li><Link to="/create">Create New</Link></li>
          <li><Link to="/profile">Profile</Link></li>
          <li><Link to="/">Logout</Link></li>
        </ul>
      </nav>

      <div className="profile-container">
        <div className="profile-header">
          <h1>Travel Profile</h1>
          <p>Your journey, your story, your memories</p>
        </div>

        <div className="profile-content">
          <div className="profile-sidebar">
            <div className="profile-card">
              <div className="profile-avatar">
                <div className="avatar-circle">
                  {getInitials(profile.name)}
                </div>
                <h2>{profile.name}</h2>
                <p style={{ color: 'var(--olive-brown)', fontStyle: 'italic' }}>
                  {profile.travelStyle}
                </p>
              </div>

              <div className="profile-info">
                <h3>Personal Information</h3>
                <div className="info-item"><span className="info-label">Email:</span> <span className="info-value">{profile.email}</span></div>
                <div className="info-item"><span className="info-label">Location:</span> <span className="info-value">{profile.location}</span></div>
                <div className="info-item"><span className="info-label">Phone:</span> <span className="info-value">{profile.phone}</span></div>
                <div className="info-item"><span className="info-label">Member Since:</span> <span className="info-value">{profile.joined}</span></div>
                <div className="info-item"><span className="info-label">Languages:</span> <span className="info-value">{profile.languages}</span></div>
                <div className="info-item"><span className="info-label">Favorite Destination:</span> <span className="info-value">{profile.favoriteDestination}</span></div>
              </div>

              <div className="profile-actions">
                <button onClick={handleEditToggle} className="btn btn-primary">
                  {isEditing ? 'Cancel Edit' : 'Edit Profile'}
                </button>
                <button onClick={handleShare} className="btn btn-secondary">Share Profile</button>
                <button onClick={handleExportData} className="btn btn-secondary">Export Data</button>
              </div>
            </div>
          </div>

          <div className="profile-main">
            <div className="stats-grid">
              <div className="stat-card"><div className="stat-number">{profile.totalTrips}</div><div className="stat-label">Total Trips</div></div>
              <div className="stat-card"><div className="stat-number">{profile.countriesVisited}</div><div className="stat-label">Countries Visited</div></div>
              <div className="stat-card"><div className="stat-number">{profile.milesFlown?.toLocaleString()}</div><div className="stat-label">Miles Flown</div></div>
              <div className="stat-card"><div className="stat-number">4.9</div><div className="stat-label">Avg Rating</div></div>
            </div>

            {isEditing ? (
              <div className="edit-form">
                <h3>Edit Your Profile</h3>
                {['name','email','location','phone','languages','travelStyle','favoriteDestination','bio'].map(field => (
                  <div className="form-group" key={field}>
                    <label>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
                    {field !== 'bio' ? (
                      <input name={field} value={formState[field] || ''} onChange={handleChange} placeholder={`Enter your ${field}`} />
                    ) : (
                      <textarea name="bio" value={formState.bio || ''} onChange={handleChange} placeholder="Tell us about your travel story..." rows="4" />
                    )}
                  </div>
                ))}
                <div className="form-actions">
                  <button onClick={handleSave} className="btn btn-primary">Save Changes</button>
                  <button onClick={handleCancel} className="btn btn-secondary">Cancel</button>
                </div>
              </div>
            ) : (
              <div className="recent-trips">
                <h3>Recent Adventures</h3>
                <div className="trip-list">
                  {recentTrips.map(trip => (
                    <div key={trip.id} className="trip-item">
                      <div className="trip-header">
                        <span className="trip-name">{trip.name}</span>
                        <span className="trip-date">{trip.date}</span>
                      </div>
                      <p className="trip-description">{trip.description}</p>
                    </div>
                  ))}
                </div>
                <div style={{ marginTop: '2rem', padding: '1.5rem', background: 'rgba(231, 239, 199, 0.5)', borderRadius: '15px' }}>
                  <h4 style={{ color: 'var(--dark-olive)', marginBottom: '1rem' }}>About Me</h4>
                  <p style={{ color: 'var(--dark-olive)', lineHeight: '1.6' }}>{profile.bio}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
