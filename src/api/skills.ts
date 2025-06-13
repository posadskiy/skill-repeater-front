import { apiClient } from './client';
import type { Skill, RepeatHistory } from '../types/api';

export const skillsApi = {
  getAll: async (userId: number): Promise<Skill[]> => {
    const response = await apiClient.get<Skill[]>(`/v0/skill/get-all/${userId}`);
    return response.data;
  },

  getById: async (id: number): Promise<Skill> => {
    const response = await apiClient.get<Skill>(`/v0/skill/get/${id}`);
    return response.data;
  },

  add: async (skill: Omit<Skill, 'id'>): Promise<Skill> => {
    const response = await apiClient.post<Skill>('/v0/skill/add', skill);
    return response.data;
  },

  addAll: async (skills: Omit<Skill, 'id'>[]): Promise<Skill[]> => {
    const response = await apiClient.post<Skill[]>('/v0/skill/add-all', skills);
    return response.data;
  },

  update: async (id: number, skill: Partial<Skill>): Promise<Skill> => {
    const response = await apiClient.put<Skill>(`/v0/skill/update/${id}`, skill);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await apiClient.delete(`/v0/skill/delete/${id}`);
  },

  repeat: async (id: number): Promise<Skill> => {
    const response = await apiClient.post<Skill>(`/v0/skill/repeat/${id}`);
    return response.data;
  },

  getHistory: async (skillId: number): Promise<RepeatHistory[]> => {
    const response = await apiClient.get<RepeatHistory[]>(`/v0/repeat-history/skill/${skillId}`);
    return response.data;
  }
}; 