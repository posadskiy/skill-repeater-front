import { apiClient } from './client';
import type { AuthResponse, User } from '../types/api';

export const authApi = {
  login: async (email: string, password: string): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse>('/v0/auth/login', { email, password });
    return response.data;
  },

  register: async (username: string, email: string, password: string): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse>('/v0/auth/register', { username, email, password });
    return response.data;
  },

  getCurrentUser: async (): Promise<User> => {
    const { data } = await apiClient.get('/api/auth/me');
    return data;
  },

  logout: () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  },
}; 