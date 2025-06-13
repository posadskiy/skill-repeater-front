export interface Skill {
  id: number;
  name: string;
  description: string;
  category: string;
  level: number;
  lastRepeated: string;
  nextRepeated: string;
  userId: number;
  period: 'HOURS' | 'DAYS' | 'WEEKS' | 'MONTHS' | 'YEARS';
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
