import { City } from "./city.model";
import { Department } from "./department.model";
import { Position } from "./position.model";

export interface EmployeeManage {
  name: string;
  lastName: string;
  mail: string;
  phone: string;
  department?: Department;
  position?: Position;
  city?: City;
  immediateChiefId: number;
  password: string;
}