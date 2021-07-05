import { City } from "./city.model";
import { Department } from "./department.model";
import { Position } from "./position.model";
import { User } from './user.model';

export interface EmployeeManage {
  id?: number;
  name: string;
  lastName: string;
  phone: string;
  department?: Department;
  position?: Position;
  city?: City;
  immediateChiefId: number;
  user?: User;
}
