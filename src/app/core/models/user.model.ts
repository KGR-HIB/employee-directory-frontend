import { Role } from './role.model';

export interface User {
  userId: number;
  mail: string;
  password: string;
  hasInitSession: boolean;
  role: Role;
}
