import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiLock, FiUser, FiPhone, FiX } from 'react-icons/fi';

const AuthPage = ({ onClose }) => {
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });

  const [registerData, setRegisterData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });

  const handleLoginChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegisterChange = (e) => {
    setRegisterData({
      ...registerData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    console.log('Login:', loginData);
    // Handle login logic here
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    if (registerData.password !== registerData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    console.log('Register:', registerData);
    // Handle registration logic here
  };

  return (
    <>
      <motion.div
        className="auth-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />
      <motion.div
        className="auth-split-container"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
      >
        <button className="auth-close-btn" onClick={onClose}>
          <FiX />
        </button>

        {/* Left Side - Login */}
        <div className="auth-split-left">
          <div className="auth-split-content">
            <div className="auth-split-header">
              <h2>Welcome Back</h2>
              <p>Login to your account</p>
            </div>

            <form onSubmit={handleLoginSubmit} className="auth-split-form">
              <div className="form-group">
                <label htmlFor="login-email">
                  <FiMail />
                  Email Address
                </label>
                <input
                  type="email"
                  id="login-email"
                  name="email"
                  value={loginData.email}
                  onChange={handleLoginChange}
                  placeholder="your@email.com"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="login-password">
                  <FiLock />
                  Password
                </label>
                <input
                  type="password"
                  id="login-password"
                  name="password"
                  value={loginData.password}
                  onChange={handleLoginChange}
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
              >
                Login
              </motion.button>
            </form>
          </div>
        </div>

        {/* Divider */}
        <div className="auth-split-divider">
          <div className="divider-line"></div>
          <div className="divider-text">OR</div>
          <div className="divider-line"></div>
        </div>

        {/* Right Side - Register */}
        <div className="auth-split-right">
          <div className="auth-split-content">
            <div className="auth-split-header">
              <h2>Create Account</h2>
              <p>Join Carnivore Couture</p>
            </div>

            <form onSubmit={handleRegisterSubmit} className="auth-split-form">
              <div className="form-group">
                <label htmlFor="register-name">
                  <FiUser />
                  Full Name
                </label>
                <input
                  type="text"
                  id="register-name"
                  name="name"
                  value={registerData.name}
                  onChange={handleRegisterChange}
                  placeholder="John Doe"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="register-email">
                  <FiMail />
                  Email Address
                </label>
                <input
                  type="email"
                  id="register-email"
                  name="email"
                  value={registerData.email}
                  onChange={handleRegisterChange}
                  placeholder="your@email.com"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="register-phone">
                  <FiPhone />
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="register-phone"
                  name="phone"
                  value={registerData.phone}
                  onChange={handleRegisterChange}
                  placeholder="+91 98765 43210"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="register-password">
                  <FiLock />
                  Password
                </label>
                <input
                  type="password"
                  id="register-password"
                  name="password"
                  value={registerData.password}
                  onChange={handleRegisterChange}
                  placeholder="Create a password"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="register-confirm">
                  <FiLock />
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="register-confirm"
                  name="confirmPassword"
                  value={registerData.confirmPassword}
                  onChange={handleRegisterChange}
                  placeholder="Confirm password"
                  required
                />
              </div>

              <div className="form-options">
                <label className="checkbox-label">
                  <input type="checkbox" required />
                  <span>I agree to Terms & Conditions</span>
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
            </form>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default AuthPage;
