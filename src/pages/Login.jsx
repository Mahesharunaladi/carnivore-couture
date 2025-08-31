import React, { useState } from 'react';
import { useAuth } from './context/AuthContext'; // Import useAuth from AuthContext
import Logo from './components/NewLogo'; // Assuming NewLogo is in components
import './Login.css';

const Login = ({ onClose }) => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    address: {
      street: '',
      city: '',
      state: '',
      zipCode: ''
    }
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login, register } = useAuth(); // Use the login and register functions from AuthContext

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith('address.')) {
      const addressField = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        address: {
          ...prev.address,
          [addressField]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
    setError('');
  };

  const validateForm = () => {
    if (!formData.email || !formData.password) {
      setError('Email and password are required');
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
      if (!formData.address.street || !formData.address.city || !formData.address.state || !formData.address.zipCode) {
        setError('All address fields are required');
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
      onClose(); // Close the login modal on successful authentication
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-header">
        <Logo className="login-logo" />
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
            {isRegistering && (
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
            )}

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            {isRegistering && (
              <>
                <div className="form-group">
                  <label htmlFor="confirmPassword">Confirm Password</label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                  />
                </div>

                <div className="address-fields">
                  <div className="form-group">
                    <label htmlFor="street">Street Address</label>
                    <input
                      type="text"
                      id="street"
                      name="address.street"
                      placeholder="Enter street address"
                      value={formData.address.street}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="city">City</label>
                    <input
                      type="text"
                      id="city"
                      name="address.city"
                      placeholder="Enter city"
                      value={formData.address.city}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="state">State</label>
                    <input
                      type="text"
                      id="state"
                      name="address.state"
                      placeholder="Enter state"
                      value={formData.address.state}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="zipCode">Zip Code</label>
                    <input
                      type="text"
                      id="zipCode"
                      name="address.zipCode"
                      placeholder="Enter zip code"
                      value={formData.address.zipCode}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </>
            )}

            {error && <p className="error-message">{error}</p>}

            <button type="submit" className="login-button" disabled={loading}>
              {loading ? 'Loading...' : (isRegistering ? 'Register' : 'Login')}
            </button>
          </form>

          <div className="toggle-form">
            {isRegistering ? 'Already have an account?' : 'Don\'t have an account?'}
            <button type="button" onClick={() => setIsRegistering(!isRegistering)} className="toggle-btn">
              {isRegistering ? 'Login here' : 'Register here'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
