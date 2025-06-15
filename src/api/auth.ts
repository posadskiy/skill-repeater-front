import { apiClient, authClient } from './client';
import type { AuthResponse, User } from '../types/api';

const SESSION_EXPIRY_KEY = 'session_expiry';

export const authApi = {
  login: async (username: string, password: string): Promise<AuthResponse> => {
    const response = await authClient.post<AuthResponse>('/login', { username, password });
    const { access_token, expires_in, username: userId } = response.data;
    
    // Store the token and user ID
    localStorage.setItem('token', access_token);
    localStorage.setItem('userId', userId);
    
    // Set session expiry
    const expiryTime = Date.now() + (expires_in * 1000);
    localStorage.setItem(SESSION_EXPIRY_KEY, expiryTime.toString());
    
    return response.data;
  },

  register: async (username: string, email: string, password: string): Promise<AuthResponse> => {
    const response = await authClient.post<AuthResponse>('/v0/auth/register', { username, email, password });
    return response.data;
  },

  getCurrentUser: async (): Promise<User> => {
    const { data } = await apiClient.get('/api/auth/me');
    return data;
  },

  logout: async () => {
    await authClient.post('/logout');
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem(SESSION_EXPIRY_KEY);
    window.location.href = '/login';
  },

  checkSessionExpiry: () => {
    const expiryTime = localStorage.getItem(SESSION_EXPIRY_KEY);
    if (!expiryTime) return true;
    
    const isExpired = Date.now() > parseInt(expiryTime);
    if (isExpired) {
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
      localStorage.removeItem(SESSION_EXPIRY_KEY);
      window.location.href = '/login';
    }
    return isExpired;
  }
}; 