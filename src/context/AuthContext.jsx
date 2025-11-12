import React, { createContext, useContext, useState, useEffect } from 'react';
import authService from '../services/authService';
import { API_BASE_URL } from '../config';
import { AuthContextValue, User } from '../types/auth';

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export { AuthContext };

export function AuthProvider({ children }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string>(localStorage.getItem('token') || '');

  useEffect(() => {
    const loadUser = async () => {
        if (token) {
            try {
                console.log('Loading user with token:', token);
                const currentUser = await getCurrentUser();
                console.log('Loaded user:', currentUser);
                setUser(currentUser);
            } catch (error) {
                console.error('Failed to load user:', error);
                localStorage.removeItem('token');
                setToken('');
            }
        }
    };
    loadUser();
}, [token]);

  const saveAuth = (token: string, user: User) => {
    setToken(token);
    setUser(user);
    localStorage.setItem('token', token);
    console.log('User object in saveAuth:', user);
  };

  async function login(email: string, password: string): Promise<User> {
    try {
      const data = await authService.login(email, password);
      saveAuth(data.token, data.user);
      return data.user;
    } catch (error: any) {
      throw error.response?.data?.message || 'Login failed';
    }
  }

  async function register(formData: { username: string; email: string; password: string; name?: string }): Promise<User> {
    try {
      const data = await authService.register(formData);
      saveAuth(data.token, data.user);
      return data.user;
    } catch (error: any) {
      throw error.response?.data?.message || 'Registration failed';
    }
  }

  async function getCurrentUser(): Promise<User> {
    const res = await fetch(`${API_BASE_URL}/api/auth/me`, {
      headers: { "Authorization": `Bearer ${token}` }
    });
    if (!res.ok) throw new Error("Not authenticated");
    return res.json();
  }

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
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}