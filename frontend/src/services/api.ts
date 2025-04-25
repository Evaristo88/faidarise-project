// frontend/src/services/api.ts
import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Add request interceptor to include auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    console.log('API Request:', config.method?.toUpperCase(), config.url);
    return config;
  },
  (error) => Promise.reject(error)
);

// Add response interceptor for logging
api.interceptors.response.use(
  (response) => {
    console.log('API Response:', response.status, response.config.url);
    return response;
  },
  (error) => {
    console.error('API Error:', error.response?.status, error.response?.data, error.config?.url);
    return Promise.reject(error);
  }
);

// Authentication
export const login = async (username: string, password: string): Promise<boolean> => {
  try {
    console.log('Attempting login with:', { username });
    
    const response = await api.post('/auth/login', { username, password });
    console.log('Login response received:', response.status);
    
    const { token } = response.data;
    if (token) {
      localStorage.setItem('token', token);
      return true;
    } else {
      console.error('No token received in login response');
      return false;
    }
  } catch (error) {
    console.error('Login error:', error);
    // Log more detailed error information
    if (axios.isAxiosError(error)) {
      console.error('Status:', error.response?.status);
      console.error('Response data:', error.response?.data);
    }
    return false;
  }
};

export const logout = (): void => {
  localStorage.removeItem('token');
  window.location.href = '/';
};

export const isAuthenticated = (): boolean => {
  return !!localStorage.getItem('token');
};

// Odds data
export const getAllOdds = async () => {
  try {
    console.log('Fetching all odds data');
    const response = await api.get('/odds');
    console.log(`Received ${response.data.length} odds events`);
    return response.data;
  } catch (error) {
    console.error('Error fetching odds:', error);
    throw error;
  }
};

export const getAvailableSports = async () => {
  try {
    console.log('Fetching available sports');
    const response = await api.get('/odds/sports');
    console.log(`Received ${response.data.length} sports`);
    return response.data;
  } catch (error) {
    console.error('Error fetching sports:', error);
    throw error;
  }
};

export const getOddsBySport = async (sportKey: string) => {
  try {
    console.log(`Fetching odds for sport: ${sportKey}`);
    const response = await api.get(`/odds/sport/${sportKey}`);
    console.log(`Received ${response.data.length} odds events for sport ${sportKey}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching odds for sport ${sportKey}:`, error);
    throw error;
  }
};