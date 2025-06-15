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

export type CreateSkillInput = Omit<Skill, 'id' | 'lastRepeated' | 'nextRepeated'>;
export type UpdateSkillInput = Partial<CreateSkillInput> & { id: number };

export interface User {
  id: string;
  username: string;
  email: string;
}

export interface AuthResponse {
  access_token: string;
  expires_in: number;
  username: string;
}

export interface RepeatHistory {
  id: number;
  skillId: number;
  repeatedAt: string;
  nextRepeated: string;
} 
