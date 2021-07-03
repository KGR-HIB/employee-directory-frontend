import { Certification } from "./certification.model";
import { City } from "./city.model";
import { Department } from "./department.model";
import { Position } from "./position.model";
import { Project } from "./project.model";
import { Skill } from "./skill.model";

export interface EmployeeFilter {
  positions: Position[];
  departments: Department[];
  projects: Project[];
  cities: City[];
  skills: Skill[];
  certifications: Certification[];
}