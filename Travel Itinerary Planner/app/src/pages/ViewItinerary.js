import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import './ViewItinerary.css';

function ViewItinerary() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [showCollabModal, setShowCollabModal] = useState(false);
  const [collaboratorEmail, setCollaboratorEmail] = useState('');
  const [collaboratorName, setCollaboratorName] = useState('');

  useEffect(() => {
    fetch(`http://localhost:5000/api/itinerary/${id}`)
      .then(res => res.json())
      .then(setData)
      .catch(console.error);
  }, [id]);

  const generateShareLink = () => `${window.location.origin}/view/${id}`;

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => showSuccessMessage('Share link copied!'));
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this itinerary?')) {
      try {
        await fetch(`http://localhost:5000/api/itinerary/${id}`, { method: 'DELETE' });
        alert('Itinerary deleted successfully!');
        navigate('/');
      } catch (err) {
        alert('Failed to delete itinerary');
      }
    }
  };

  const handleEdit = () => alert('Redirecting to edit page...');
  const handleShareClick = () => copyToClipboard(generateShareLink());
  const handleCollabClick = () => setShowCollabModal(true);
  const handleModalClose = () => {
    setShowCollabModal(false);
    setCollaboratorEmail('');
    setCollaboratorName('');
  };

  const showSuccessMessage = (message) => {
    const msg = document.createElement('div');
    msg.className = 'success-message show';
    msg.textContent = message;
    document.querySelector('.itinerary-details').appendChild(msg);
    setTimeout(() => msg.remove(), 3000);
  };

  const handleCollabSubmit = (e) => {
    e.preventDefault();
    if (collaboratorEmail && collaboratorName) {
      handleModalClose();
      showSuccessMessage(`Invitation sent to ${collaboratorName}!`);
    }
  };

  if (!data) return <div className="loading">Loading itinerary...</div>;

  return (
    <div className="view-itinerary">
      <nav className="navbar">
        <div className="logo">TravelMate</div>
        <ul className="nav-links">
          <li><Link to="/home">Home</Link></li>
          <li><Link to="/create">Create New</Link></li>
          <li><Link to="/profile">Profile</Link></li>
          <li><Link to="/">Logout</Link></li>
        </ul>
      </nav>

      <div className="itinerary-details">
        <h2>{data.title}</h2>
        <p><strong>Duration:</strong> {data.startDate} to {data.endDate}</p>
        <p><strong>Destinations:</strong> {data.destinations?.join(' → ')}</p>
        <p><strong>Total Days:</strong> {Math.ceil((new Date(data.endDate) - new Date(data.startDate)) / (1000 * 60 * 60 * 24))} days</p>

        <h3>Activities</h3>
        <ul>
          {data.activities?.map((act, i) => <li key={i}>{act}</li>)}
        </ul>

        {data.notes && (
          <div className="notes">
            <h3>Notes</h3>
            <p>{data.notes}</p>
          </div>
        )}

        {data.photos?.length > 0 && (
          <div className="photos">
            <h3>Photos</h3>
            <div className="photo-grid">
              {data.photos.map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt={`Scenic spot ${i + 1}`}
                  onError={(e) => e.target.src = `https://dummyimage.com/300x200/aec8a4/3b3b1a&text=Photo+${i + 1}`}

                />
              ))}
            </div>
          </div>
        )}

        <div className="actions">
          <button onClick={handleEdit}>✏️ Edit</button>
          <button onClick={handleDelete}>🗑️ Delete</button>
        </div>

        <div className="share-collab-section">
          <button onClick={handleShareClick}>🔗 Share</button>
          <button onClick={handleCollabClick}>🤝 Invite Collaborator</button>
        </div>
      </div>

      {showCollabModal && (
        <div className="collab-modal active">
          <div className="collab-modal-content">
            <h3>Invite Collaborator</h3>
            <form onSubmit={handleCollabSubmit}>
              <input
                type="text"
                value={collaboratorName}
                onChange={(e) => setCollaboratorName(e.target.value)}
                placeholder="Name"
                required
              />
              <input
                type="email"
                value={collaboratorEmail}
                onChange={(e) => setCollaboratorEmail(e.target.value)}
                placeholder="Email"
                required
              />
              <div>
                <button type="submit">Send</button>
                <button type="button" onClick={handleModalClose}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <footer className="footer">
        <p>&copy; 2025 TravelMate. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default ViewItinerary;
