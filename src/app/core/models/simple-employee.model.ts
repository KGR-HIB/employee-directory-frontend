import { Position } from './position.model';
import { Department } from './department.model';
import { User } from './user.model';

export interface SimpleEmployee {
  id: number;
  name: string;
  lastName: string;
  phone: string;
  photo: string;
  department: Department;
  position: Position;
  user: User;
}
