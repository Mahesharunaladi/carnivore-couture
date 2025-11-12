import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from "../context/AuthContext.jsx";
import { AuthContextValue } from "../types/auth";
import "../../public/login.css"; // Assuming you want to reuse some login styles

function Register() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { register } = useContext(AuthContext) as AuthContextValue;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const { confirmPassword, ...registerPayload } = formData;
      await register({
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });
      alert('Registration successful! Please log in.');
      navigate('/login'); // Redirect to login after successful registration
    } catch (err: any) {
      console.error('Registration error:', err);
      setError(err.message || 'An error occurred during registration');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <img src="/logo.png" alt="Carnivore Couture Logo" className="login-logo" />
        <h2 className="login-title">Sign Up</h2>
        <form onSubmit={handleSubmit}>
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
          {error && <p className="error-message">{error}</p>}
          <div className="switch-form-link">
            <p>
              Already have an account?{' '}
              <Link to="/login">Log in</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;