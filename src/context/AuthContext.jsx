import React, { createContext, useContext, useState } from 'react';
import authService from '../services/authService'; // Import authService
import { API_BASE_URL } from '../config';

const AuthContext = createContext();

export { AuthContext }; // Add this line to export AuthContext

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || '');

  // Helper to save token and user info after successful login/register
  const saveAuth = (token, user) => {
    setToken(token);
    setUser(user);
    localStorage.setItem('token', token);
    console.log('User object in saveAuth:', user); // Add this line for debugging
  };

  // LOGIN FUNCTION
  async function login(email, password) {
    try {
      const data = await authService.login(email, password);
      saveAuth(data.token, data.user);
      return data.user;
    } catch (error) {
      throw error.response?.data?.message || 'Login failed';
    }
  }

  // REGISTER FUNCTION
  async function register(formData) {
    try {
      const data = await authService.register(formData);
      saveAuth(data.token, data.user);
      return data.user;
    } catch (error) {
      throw error.response?.data?.message || 'Registration failed';
    }
  }

  // GET CURRENT USER
  async function getCurrentUser() {
    const res = await fetch(`${API_BASE_URL}/me`, {
      headers: { "Authorization": `Bearer ${token}` }
    });
    if (!res.ok) throw new Error("Not authenticated");
    return res.json();
  }

  // LOGOUT FUNCTION
  function logout() {
    setUser(null);
    setToken('');
    localStorage.removeItem('token');
  }

  return (
    <AuthContext.Provider value={{ user, token, login, register, getCurrentUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}