export type Period = 'HOURS' | 'DAYS' | 'WEEKS' | 'MONTHS' | 'YEARS';

/** Matches backend `com.posadskiy.skillrepeater.api.model.Priority` */
export type Priority = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';

export const PRIORITY_SELECT_OPTIONS: { value: Priority; label: string }[] = [
  { value: 'LOW', label: 'Low' },
  { value: 'MEDIUM', label: 'Medium' },
  { value: 'HIGH', label: 'High' },
  { value: 'CRITICAL', label: 'Critical' }
];

export function priorityLabel(p: Priority | undefined): string {
  if (!p) return '—';
  return PRIORITY_SELECT_OPTIONS.find((o) => o.value === p)?.label ?? p;
}

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
  /** Omitted on older API responses until backfilled */
  priority?: Priority;
}

/** Create always sends priority from the form (required by backend entity). */
export type CreateSkillInput = Omit<Skill, 'id' | 'lastRepeated' | 'nextRepeated' | 'priority'> & {
  priority: Priority;
};

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
