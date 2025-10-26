import axios from 'axios';
import { API_BASE_URL } from '../config';

const register = async (userData) => {
  const response = await axios.post(`${API_BASE_URL}/api/auth/register`, userData);
  return response.data;
};

const login = async (email, password) => {
  const response = await axios.post(`${API_BASE_URL}/api/auth/login`, { email, password });
  return response.data;
};

const authService = {
  register,
  login,
};

export default authService;