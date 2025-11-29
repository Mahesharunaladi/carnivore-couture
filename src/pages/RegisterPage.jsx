import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiLock, FiUser, FiPhone, FiArrowLeft } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import './Auth.css';

const RegisterPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    console.log('Register:', formData);
    // Handle registration logic here
    // After successful registration, navigate to home
    // navigate('/');
  };

  return (
    <div className="auth-page">
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
            <h2>Create Account</h2>
            <p>Join Carnivore Couture today</p>
          </div>

          <form onSubmit={handleSubmit} className="auth-page-form">
            <div className="form-group">
              <label htmlFor="name">
                <FiUser />
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="John Doe"
                required
              />
            </div>

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
              <label htmlFor="phone">
                <FiPhone />
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+91 98765 43210"
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
                placeholder="Create a strong password"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">
                <FiLock />
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your password"
                required
              />
            </div>

            <div className="form-options">
              <label className="checkbox-label">
                <input type="checkbox" required />
                <span>I agree to the Terms & Conditions</span>
              </label>
            </div>

            <motion.button
              type="submit"
              className="auth-submit-btn"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Create Account
            </motion.button>

            <div className="auth-switch">
              <p>
                Already have an account?{' '}
                <button type="button" onClick={() => navigate('/login')} className="auth-switch-link">
                  Login
                </button>
              </p>
            </div>
          </form>
        </div>
      </div>

      <div className="auth-page-right">
        <div className="auth-page-bg"></div>
        <div className="auth-page-overlay">
          <h2>Join Our Community</h2>
          <p>Get access to exclusive deals and premium quality meats delivered fresh daily.</p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
