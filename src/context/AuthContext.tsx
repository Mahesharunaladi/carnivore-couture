import React, { createContext, useContext, useState, ReactNode } from 'react';

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

  const login = async (email: string, password: string): Promise<User> => {
    if (email === 'test@carnivore.com' && password === '123') {
      const userData: User = { username: 'John', email, name: 'John Doe', token: 'mock-token' };
      setUser(userData);
      return userData;
    }
    throw new Error('Invalid credentials');
  };

  const register = async (data: { username: string; email: string; password: string }) => {
    if (!data.username || !data.email.includes('@') || data.password.length < 6) {
      throw new Error('Invalid registration data');
    }
    await new Promise(resolve => setTimeout(resolve, 500));
    console.log('Registered:', data);
  };

  const logout = () => setUser(null);

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