import axios from 'axios';
import { API_BASE_URL } from '../config';

const API_URL = '/api/auth';

const register = async (userData) => {
  const response = await axios.post(`${API_URL}/register`, userData);
  return response.data;
};

// Change login to use API_URL for consistency
const login = async (email, password) => {
  const response = await axios.post(`${API_URL}/login`, { email, password });
  return response.data;
};

const authService = {
  register,
  login,
};

export default authService;