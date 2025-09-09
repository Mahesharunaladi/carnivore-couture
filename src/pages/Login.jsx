import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
// REMOVE THE FOLLOWING LINE:
// import "../../public/login.css";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: '', // Changed from name to username for login
    firstName: '', // Added for registration
    lastName: '', // Added for registration
    email: '',
    password: '',
    confirmPassword: '',
    // Removed address and phoneNumber as they are not in the new design
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!isLogin && formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      // Use the /api prefix for both login and register endpoints
      const url = isLogin ? '/api/auth/login' : '/api/auth/register';
      const payload = isLogin
        ? { email: formData.email, password: formData.password } // Use email for login
        : { username: formData.username, email: formData.email, password: formData.password }; // Use username for register

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        if (isLogin) {
          login(data.token, data.user);
          navigate('/');
        } else {
          alert('Registration successful! Please log in.');
          setIsLogin(true);
        }
      } else {
        setError(data.message || 'An error occurred');
      }
    } catch (err) {
      setError('Network error or server is unreachable');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <img src="/logo3.png" alt="Carnivore Couture Logo" className="login-logo" />
        <h2 className="login-title">{isLogin ? 'Log in' : 'Sign Up'}</h2>
        <form onSubmit={handleSubmit}>
          {isLogin ? (
            // Login Form
            <>
              <div className="input-group">
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  placeholder="Username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="input-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="options-group">
                <label className="remember-me">
                  <input type="checkbox" /> Remember me
                </label>
                <a href="#" className="forgot-password">Forgot Password?</a>
              </div>
              <button type="submit" className="login-submit-btn">
                Log in
              </button>
            </>
          ) : (
            // Register Form
            <>
              <div className="input-group">
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  placeholder="Username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
              </div>
              {/* REMOVE firstName and lastName input groups if not needed by backend */}
              {/*
              <div className="input-group-row">
                <div className="input-group">
                  <label htmlFor="firstName">First Name</label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="input-group">
                  <label htmlFor="lastName">Last Name</label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              */}
              <div className="input-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="input-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="input-group">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="terms-checkbox">
                <label>
                  <input type="checkbox" required /> I accept the Terms of Use & Privacy Policy.
                </label>
              </div>
              <button type="submit" className="login-submit-btn">
                Sign Up
              </button>
            </>
          )}
          {error && <p className="error-message">{error}</p>}
        </form>
        <div className="login-footer">
          {isLogin ? (
            <p>
              <span onClick={() => setIsLogin(!isLogin)} className="toggle-link">
                Create an Account
              </span>
            </p>
          ) : (
            <p>
              Already have an account?{' '}
              <span onClick={() => setIsLogin(!isLogin)} className="toggle-link">
                Login here.
              </span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;