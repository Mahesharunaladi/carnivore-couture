import React, { useState } from 'react';
import { useAuth } from './context/AuthContext';

const Login = ({ onClose }) => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login, register } = useAuth();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const validateForm = () => {
    if (!formData.email || !formData.password) {
      setError('All fields are required');
      return false;
    }
    if (isRegistering) {
      if (!formData.name) {
        setError('Name is required');
        return false;
      }
      if (formData.password !== formData.confirmPassword) {
        setError('Passwords do not match');
        return false;
      }
      if (formData.password.length < 6) {
        setError('Password must be at least 6 characters');
        return false;
      }
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      if (isRegistering) {
        await register(formData);
      } else {
        await login(formData.email, formData.password);
      }
      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-header">
        <div className="logo">
          <span className="logo-icon">C</span>
          <span className="logo-text">Canivores</span>
        </div>
        <nav className="nav-menu">
          <a href="#home">Home</a>
          <a href="#menu">Menu</a>
          <a href="#coffee">Coffee</a>
          <button className="login-btn-nav">Sign In</button>
        </nav>
      </div>

      <div className="login-content">
        <div className="chicken-image">
          <img src="/public/chicken.svg" alt="Chicken" className="rooster-img" />
        </div>
        
        <div className="login-form-container">
          <h1 className="login-title">Chicken & Dvanules</h1>
          <p className="login-subtitle">Leaat bicus of cive hirare ce off alegeo</p>
          
          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label htmlFor="email">Ccc.et</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Urese sas"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Lenea</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Geitriche"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Fastorze</label>
              <input
                type="text"
                id="text"
                name="text"
                placeholder="Beufarl"
                value={formData.text}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className="login-submit-btn">
              Save Pattens
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
