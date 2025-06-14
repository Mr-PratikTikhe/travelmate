

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Auth.css';
const API = process.env.REACT_APP_API_URL;
fetch(`${API}/auth/register`)


function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });
  const [formData, setFormData] = useState({
    firstName: '', lastName: '', email: '', password: '', confirmPassword: '',
    travelStyle: '', location: '', birthDate: '', agreeToTerms: false
  });
  const [passwordStrength, setPasswordStrength] = useState(0);

  const navigate = useNavigate();
  const API = 'http://localhost:5000/api/auth';

  useEffect(() => {
    if (message.text) {
      const timer = setTimeout(() => setMessage({ text: '', type: '' }), 5000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setFormData({
      firstName: '', lastName: '', email: '', password: '', confirmPassword: '',
      travelStyle: '', location: '', birthDate: '', agreeToTerms: false
    });
    setMessage({ text: '', type: '' });
    setPasswordStrength(0);
  };

  const calculatePasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    return Math.min(strength, 3);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    setFormData(prev => ({ ...prev, [name]: newValue }));
    if (name === 'password') {
      setPasswordStrength(calculatePasswordStrength(value));
    }
  };

  const validateForm = () => {
    if (!isLogin) {
      if (!formData.firstName.trim()) {
        setMessage({ text: 'First name is required', type: 'error' });
        return false;
      }
      if (!formData.lastName.trim()) {
        setMessage({ text: 'Last name is required', type: 'error' });
        return false;
      }
      if (formData.password !== formData.confirmPassword) {
        setMessage({ text: 'Passwords do not match', type: 'error' });
        return false;
      }
      if (passwordStrength < 2) {
        setMessage({ text: 'Password is too weak.', type: 'error' });
        return false;
      }
      if (!formData.travelStyle) {
        setMessage({ text: 'Please select your travel style', type: 'error' });
        return false;
      }
      if (!formData.agreeToTerms) {
        setMessage({ text: 'Please agree to terms', type: 'error' });
        return false;
      }
    }

    if (!formData.email.trim()) {
      setMessage({ text: 'Email is required', type: 'error' });
      return false;
    }

    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setMessage({ text: 'Please enter a valid email address', type: 'error' });
      return false;
    }

    if (!formData.password) {
      setMessage({ text: 'Password is required', type: 'error' });
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsLoading(true);
    try {
      const res = await fetch(`${API}/${isLogin ? 'login' : 'register'}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data);
      localStorage.setItem('userEmail', data.email);
      navigate('/home'); // ✅ Redirect to HomePage
    } catch (err) {
      setMessage({ text: err.message, type: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  const getPasswordStrengthText = () => ['Weak', 'Medium', 'Strong'][passwordStrength - 1] || '';
  const getPasswordStrengthClass = () => ['strength-weak', 'strength-medium', 'strength-strong'][passwordStrength - 1] || '';

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-brand">
          <div className="auth-logo">TravelMate</div>
          <p className="auth-subtitle">Your journey begins here</p>
        </div>

        <h2>{isLogin ? 'Welcome Back' : 'Join Our Community'}</h2>

        {message.text && <div className={`${message.type}-message`}>{message.text}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          {!isLogin && (
            <>
              <div className="form-group">
                <label htmlFor="firstName">First Name</label>
                <input name="firstName" value={formData.firstName} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label htmlFor="lastName">Last Name</label>
                <input name="lastName" value={formData.lastName} onChange={handleChange} required />
              </div>
            </>
          )}
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input name="email" value={formData.email} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input name="password" value={formData.password} onChange={handleChange} required />
            {!isLogin && formData.password && (
              <div className="password-strength">
                <div className="strength-bar">
                  <div className={`strength-fill ${getPasswordStrengthClass()}`}></div>
                </div>
                <span>Password strength: {getPasswordStrengthText()}</span>
              </div>
            )}
          </div>
          {!isLogin && (
            <>
              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label htmlFor="travelStyle">Travel Style</label>
                <select name="travelStyle" value={formData.travelStyle} onChange={handleChange} required>
                  <option value="">Select your travel style</option>
                  {['Adventure Seeker','Cultural Explorer','Luxury Traveler','Budget Backpacker','Family Vacationer','Business Traveler','Solo Explorer','Group Traveler','Eco Tourist','Digital Nomad'].map(style => (
                    <option key={style} value={style}>{style}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="location">Location (Optional)</label>
                <input name="location" value={formData.location} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label htmlFor="birthDate">Birth Date (Optional)</label>
                <input type="date" name="birthDate" value={formData.birthDate} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label>
                  <input type="checkbox" name="agreeToTerms" checked={formData.agreeToTerms} onChange={handleChange} required />
                  I agree to the terms
                </label>
              </div>
            </>
          )}
          <button type="submit" className={`auth-button ${isLoading ? 'loading' : ''}`} disabled={isLoading}>
            {isLoading ? 'Please wait...' : (isLogin ? 'Sign In' : 'Create Account')}
          </button>
        </form>

        <div className="auth-divider"><span>or</span></div>
        <p onClick={toggleForm} className="auth-toggle">
          {isLogin ? 'New to TravelMate? Create an account' : 'Already have an account? Sign in'}
        </p>
      </div>
    </div>
  );
}

export default AuthPage;
