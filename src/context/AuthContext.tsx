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
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Failed to parse user from localStorage:", error);
        localStorage.removeItem('user'); // Clear invalid data
      }
    }
  }, []);

  const login = async (email: string, password: string): Promise<User> => {
    const response = await authService.login(email, password);
    const userData: User = { username: response.username, email: response.email, name: response.name, token: response.token };
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    return userData;
  };

  const register = async (data: { username: string; email: string; password: string }) => {
    if (!data.username || !data.email.includes('@') || data.password.length < 6) {
      throw new Error('Invalid registration data');
    }
    await new Promise(resolve => setTimeout(resolve, 500));
    console.log('Registered:', data);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
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