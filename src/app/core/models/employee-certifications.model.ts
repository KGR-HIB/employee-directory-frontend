import { Certification } from './certification.model';

export interface EmployeeCertifications {
  employeeId: number;
  certifications: Certification[]
}
