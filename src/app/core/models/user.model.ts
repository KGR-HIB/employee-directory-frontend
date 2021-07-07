import { Role } from './role.model';
import { UserEmployee } from './user-employee.model';

export interface User {
  id?: number;
  email: string;
  password?: string;
  tokenType?: string;
  accessToken?: string;
  loginFirstTime?: boolean;
  role?: Role;
  roleId?: number;
  employe?: UserEmployee;
}
