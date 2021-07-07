import { SimpleEmployee } from "./simple-employee.model";

export interface PageEmployees {
  employes: SimpleEmployee[];
  total: number;
}