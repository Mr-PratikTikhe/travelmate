import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';
import CreateItinerary from './pages/CreateItinerary';
import ViewItinerary from './pages/ViewItinerary';
import ProfilePage from './pages/ProfilePage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />        
        <Route path="/auth" element={<AuthPage />} />           
        <Route path="/create" element={<CreateItinerary />} />
        <Route path="/view/:id" element={<ViewItinerary />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </Router>
  );
}

export default App;
