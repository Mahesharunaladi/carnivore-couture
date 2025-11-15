import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
// @ts-ignore
import authService from '../services/authService';

interface User {
  username: string;
  email: string;
  name: string;
  token?: string; // Add token property
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<User>;
  register: (data: { username: string; email: string; password: string }) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  console.log('AuthProvider rendering');
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    console.log('AuthContext useEffect running');
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      console.log('Found stored user in localStorage');
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        console.log('User set from localStorage:', parsedUser);
      } catch (error) {
        console.error("Failed to parse user from localStorage:", error);
        localStorage.removeItem('user'); // Clear invalid data
      }
    } else {
      console.log('No stored user found in localStorage');
    }
  }, []);

  const login = async (email: string, password: string): Promise<User> => {
    console.log('Login function called');
    const response = await authService.login(email, password);
    const userData: User = { username: response.username, email: response.email, name: response.name, token: response.token };
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    console.log('User logged in:', userData);
    return userData;
  };

  const register = async (data: { username: string; email: string; password: string }) => {
    console.log('Register function called');
    if (!data.username || !data.email.includes('@') || data.password.length < 6) {
      throw new Error('Invalid registration data');
    }
    await new Promise(resolve => setTimeout(resolve, 500));
    console.log('Registered:', data);
  };

  const logout = () => {
    console.log('Logout function called');
    setUser(null);
    localStorage.removeItem('user');
    console.log('User logged out');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};