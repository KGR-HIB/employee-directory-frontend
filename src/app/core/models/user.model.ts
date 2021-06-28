import { Role } from './role.model';

export interface User {
  userId: number;
  mail: string;
  password: string;
  token: string;
  hasInitSession: boolean;
  role?: Role;
}
