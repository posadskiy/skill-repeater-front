import { userClient } from './client';

export interface SignupRequest {
  username: string;
  email: string;
  password: string;
}

export interface SignupResponse {
  id: string;
  username: string;
  email: string;
}

export const userApi = {
  signup: async (data: SignupRequest): Promise<SignupResponse> => {
    const response = await userClient.post<SignupResponse>('/signup', data);
    return response.data;
  },
}; 