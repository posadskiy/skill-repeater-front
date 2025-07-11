import axios from 'axios';
import { authApi } from './auth';

const API_BASE_URL = import.meta.env.VITE_API_URL || '/v0';
const AUTH_BASE_URL = import.meta.env.VITE_AUTH_SERVICE_URL || import.meta.env.VITE_AUTH_URL || '/auth';
const USER_BASE_URL = import.meta.env.VITE_USER_SERVICE_URL || import.meta.env.VITE_USER_URL || '/user';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const authClient = axios.create({
  baseURL: AUTH_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const userClient = axios.create({
  baseURL: USER_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to add the auth token to requests
apiClient.interceptors.request.use(
  (config) => {
    // Check if session is expired
    if (authApi.checkSessionExpiry()) {
      return Promise.reject(new Error('Session expired'));
    }

    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle 401 errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Clear token and redirect to login
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
      localStorage.removeItem('session_expiry');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
); 
