import { Project } from './project.model';

export interface EmployeeProjects {
  employeeId: number;
  projects: Project[]
}
