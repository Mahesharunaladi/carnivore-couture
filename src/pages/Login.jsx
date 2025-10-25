import React, { useState, useContext } from 'react'; // Import React and useContext
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from "../context/AuthContext";
import "../../public/login.css";

function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { login, register } = useContext(AuthContext); // Destructure register from AuthContext

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
      if (isLogin) {
        // Use the login function from AuthContext
        await login(formData.email, formData.password);
        navigate('/');
      } else {
        // Use the register function from AuthContext
        const userData = { 
          username: formData.username, 
          email: formData.email, 
          password: formData.password, 
          name: formData.username // Add this line to match server expectations
        };
        await register(userData);
        alert('Registration successful! Please log in.');
        setIsLogin(true);
      }
    } catch (err) {
      console.error('Authentication error:', err);
      setError(err.message || 'An error occurred during authentication');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <img src="/logo.png" alt="Carnivore Couture Logo" className="login-logo" />
        <h2 className="login-title">{isLogin ? 'Log in' : 'Sign Up'}</h2>
        <form onSubmit={handleSubmit}>
          {isLogin ? (
            // Login Form
            <>
              <div className="input-group">
                <label htmlFor="email">Email</label> {/* Changed to email for login */}
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
          <div className="switch-form-link">
            {isLogin ? (
              <p>
                Don't have an account?{' '}
                <span onClick={() => setIsLogin(false)}>Sign Up</span>
              </p>
            ) : (
              <p>
                Already have an account?{' '}
                <span onClick={() => setIsLogin(true)}>Log in</span>
              </p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;