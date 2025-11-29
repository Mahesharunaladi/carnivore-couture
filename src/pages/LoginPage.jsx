import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiLock, FiArrowLeft, FiCheckCircle } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import './Auth.css';

const LoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:3001/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        // Store token and user data in localStorage
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        
        setSuccess(true);
        
        // Redirect after a short delay
        setTimeout(() => {
          navigate('/');
        }, 1500);
      } else {
        setError(data.message || 'Login failed. Please check your credentials.');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('Unable to connect to server. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-page">
      {success && (
        <motion.div
          className="success-message"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <FiCheckCircle size={24} />
          <span>Login successful! Redirecting...</span>
        </motion.div>
      )}

      <div className="auth-page-left">
        <motion.button
          className="back-to-home"
          onClick={() => navigate('/')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <FiArrowLeft /> Back to Home
        </motion.button>

        <div className="auth-page-content">
          <div className="auth-page-header">
            <h1 className="auth-page-logo">CARNIVORE COUTURE</h1>
            <h2>Welcome Back</h2>
            <p>Login to your account</p>
          </div>

          <form onSubmit={handleSubmit} className="auth-page-form">
            {error && (
              <motion.div
                className="error-message"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                {error}
              </motion.div>
            )}

            <div className="form-group">
              <label htmlFor="email">
                <FiMail />
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your@email.com"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">
                <FiLock />
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                required
              />
            </div>

            <div className="form-options">
              <label className="checkbox-label">
                <input type="checkbox" />
                <span>Remember me</span>
              </label>
              <a href="#" className="forgot-password">
                Forgot Password?
              </a>
            </div>

            <motion.button
              type="submit"
              className="auth-submit-btn"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={isLoading}
            >
              {isLoading ? 'Logging in...' : 'Login'}
            </motion.button>

            <div className="auth-switch">
              <p>
                Don't have an account?{' '}
                <button type="button" onClick={() => navigate('/register')} className="auth-switch-link">
                  Create Account
                </button>
              </p>
            </div>
          </form>
        </div>
      </div>

      <div className="auth-page-right">
        <div className="auth-page-bg"></div>
        <div className="auth-page-overlay">
          <h2>Premium Quality Meats</h2>
          <p>Experience the finest selection of premium meats delivered fresh to your doorstep.</p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
