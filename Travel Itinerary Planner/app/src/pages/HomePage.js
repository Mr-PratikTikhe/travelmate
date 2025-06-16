
import React, { useEffect, useState } from 'react';
import './HomePage.css';
import heroImage1 from './assets/hero1.png';
import heroImage2 from './assets/hero2.png';
import heroImage3 from './assets/hero.png';
import { Link, useNavigate } from 'react-router-dom';
const API = process.env.REACT_APP_API_URL;
fetch(`${API}/auth/register`)


function HomePage() {
  const [itineraries, setItineraries] = useState([]);
  const email = localStorage.getItem('userEmail');
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:5000/api/itinerary/user/${email}`)
      .then(res => res.json())
      .then(data => setItineraries(data));
  }, [email]);

  return (
    <div className="homepage">
      <nav className="navbar">
        <div className="logo">TravelMate</div>
        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/create">Create New</Link></li>
          <li><Link to="/profile">Profile</Link></li>
          <li><Link to="/auth">Logout</Link></li>
        </ul>
      </nav>

      <header className="hero">
        <div className="hero-slider">
          <div className="hero-slide" style={{ backgroundImage: `url(${heroImage1})` }}></div>
          <div className="hero-slide" style={{ backgroundImage: `url(${heroImage2})` }}></div>
          <div className="hero-slide" style={{ backgroundImage: `url(${heroImage3})` }}></div>
        </div>
        <div className="hero-content">
          <h1>Plan Your Perfect Journey</h1>
          <p>Discover amazing destinations and create unforgettable memories</p>
          <Link to="/create" className="cta-button">Start Planning Your Adventure</Link>
        </div>
      </header>

      <section className="sample-itineraries">
        <h2>Your Itineraries</h2>
        <div className="card-container">
          {itineraries.length === 0 ? (
            <p>No itineraries found. Create one now!</p>
          ) : (
            itineraries.map((trip) => (
              <div key={trip._id} className="itinerary-card" onClick={() => navigate(`/view/${trip._id}`)}>
                <h3>{trip.title}</h3>
                <p>{trip.startDate} - {trip.endDate}</p>
                <p>{trip.destinations?.join(', ')}</p>
              </div>
            ))
          )}
        </div>
      </section>

      <footer className="footer">
        <p>&copy; 2025 TravelMate. Crafting extraordinary journeys worldwide.</p>
      </footer>
    </div>
  );
}

export default HomePage;