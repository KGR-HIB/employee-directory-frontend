import { Certification } from './certification.model';
import { City } from './city.model';
import { Department } from './department.model';
import { Position } from './position.model';
import { Project } from './project.model';
import { SimpleEmployee } from './simple-employee.model';
import { Skill } from './skill.model';
import { User } from './user.model';

export interface Employee {
  id: number;
  name: string;
  lastName: string;
  phone: string;
  photo: string;
  user: User;
  city: City;
  position: Position;
  department: Department;
  projects: Project[];
  certifications: Certification[];
  skills: Skill[];
  immediateChief: SimpleEmployee;
}
