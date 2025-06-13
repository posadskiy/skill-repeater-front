export type Period = 'HOURS' | 'DAYS' | 'WEEKS' | 'MONTHS' | 'YEARS';

export interface Skill {
  id: number;
  name: string;
  description: string;
  level: number;
  lastRepeated: string;
  nextRepeated: string;
  userId: number;
  period: Period;
  number: number;
}

export interface User {
  id: number;
  username: string;
  email: string;
}

export interface AuthResponse {
  token: string;
  userId: number;
}

export interface RepeatHistory {
  id: number;
  skillId: number;
  repeatedAt: string;
  nextRepeated: string;
} 
