import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import '../public/login.css'; // Assuming this is the correct path to your CSS file

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    address: '',
    phoneNumber: '',
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
      const url = isLogin ? 'http://localhost:5000/api/auth/login' : 'http://localhost:5000/api/auth/register';
      const payload = isLogin
        ? { email: formData.email, password: formData.password }
        : { name: formData.name, email: formData.email, password: formData.password, address: formData.address, phoneNumber: formData.phoneNumber };

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
        <h2 className="login-title">{isLogin ? 'Login' : 'Register'}</h2>
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="input-group">
              <label htmlFor="name">Username</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Type your username"
                value={formData.name}
                onChange={handleChange}
                required={!isLogin}
              />
            </div>
          )}
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Type your email"
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
              placeholder="Type your password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          {!isLogin && (
            <div className="input-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required={!isLogin}
              />
            </div>
          )}
          {!isLogin && (
            <div className="input-group">
              <label htmlFor="address">Address</label>
              <input
                type="text"
                id="address"
                name="address"
                placeholder="Your address"
                value={formData.address}
                onChange={handleChange}
                required={!isLogin}
              />
            </div>
          )}
          {!isLogin && (
            <div className="input-group">
              <label htmlFor="phoneNumber">Phone Number</label>
              <input
                type="text"
                id="phoneNumber"
                name="phoneNumber"
                placeholder="Your phone number"
                value={formData.phoneNumber}
                onChange={handleChange}
                required={!isLogin}
              />
            </div>
          )}
          {error && <p className="error-message">{error}</p>}
          <button type="submit" className="login-submit-btn">
            {isLogin ? 'LOGIN' : 'REGISTER'}
          </button>
        </form>
        <div className="social-login">
          <p>Or Sign Up Using</p>
          <div className="social-icons">
            <a href="#" className="social-icon facebook"><i className="fab fa-facebook-f"></i></a>
            <a href="#" className="social-icon twitter"><i className="fab fa-twitter"></i></a>
            <a href="#" className="social-icon google"><i className="fab fa-google"></i></a>
          </div>
        </div>
        <div className="login-footer">
          <p>
            {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
            <span onClick={() => setIsLogin(!isLogin)} className="toggle-link">
              {isLogin ? 'SIGN UP' : 'LOGIN'}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;