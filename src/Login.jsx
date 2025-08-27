import React, { useState } from 'react';
import axios from 'axios';

function Login() {
  const [isRegistering, setIsRegistering] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [message, setMessage] = useState({
    type: '',
    text: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: '', text: '' }); // Clear previous messages

    try {
      const url = isRegistering
        ? 'http://localhost:5000/api/auth/register'
        : 'http://localhost:5000/api/auth/login';
      const response = await axios.post(url, formData);

      setMessage({ type: 'success', text: response.data.message });
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        // Redirect or update UI as needed after successful login/registration
        console.log('Token:', response.data.token);
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'An unexpected error occurred.';
      setMessage({ type: 'error', text: errorMessage });
    }
  };

  const toggleForm = () => {
    setIsRegistering(!isRegistering);
    setMessage({ type: '', text: '' }); // Clear messages on form toggle
    setFormData({ username: '', password: '' }); // Clear form data on toggle
  };

  return (
    <div className="login-container">
      <header className="login-header">
        <img src="/logo-removebg-preview.png" alt="Carnivore Couture Logo" className="login-logo" />
        <h1>Welcome to Carnivore Couture</h1>
      </header>
      <main className="login-main">
        <div className="login-form-container">
          <h2>{isRegistering ? 'Register' : 'Login'}</h2>
          {message.text && (
            <div className={message.type === 'success' ? 'success-message' : 'error-message'}>
              {message.text}
            </div>
          )}
          <form onSubmit={handleSubmit} className="login-form">
            <div className="input-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                name="username"
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
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" className="login-button">
              {isRegistering ? 'Register' : 'Login'}
            </button>
          </form>
          <div className="toggle-form">
            {isRegistering ? 'Already have an account?' : 'Don\'t have an account?'}
            <button type="button" onClick={toggleForm} className="toggle-btn">
              {isRegistering ? 'Login here' : 'Register here'}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Login;
