import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { API_URL, EMPLOYEE_PATHS, REST_CONTROLLER } from "@constants";
import {
  Certification,
  Employee,
  EmployeeCertifications,
  EmployeeFilter,
  EmployeeManage,
  EmployeeProjects,
  EmployeeSkills, Page,
  Project, Response, SimpleEmployee,
  Skill
} from "@models";
import { Pagination } from "@share/models/pagination.model";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { AuthService } from './auth.service';
import { HttpBaseService } from "./http-base.service";

@Injectable({
  providedIn: "root",
})
export class EmployeeService extends HttpBaseService {
  constructor(http: HttpClient, private auth: AuthService) {
    super(http, `${API_URL}${REST_CONTROLLER.EMPLOYEE}`);
  }

  /**
   * Get list of employees with resumed data
   *
   * @param queryFilter : Parametter to filter employees
   * @returns
   */
  listChiefEmployees(queryFilter: string | null): Observable<SimpleEmployee[]> {
    const param =
      queryFilter && queryFilter.trim() !== "" ? `?query=${queryFilter}` : "";
    return this.get(param).pipe(map((response) => response.data));
  }

  /**
   * Create a new employee
   *
   * @param employee : employee to save
   * @returns
   */
  createEmployee(employee: EmployeeManage): Observable<Response<any>> {
    return this.post(`/createOrUpdate`, employee);
  }

  /**
   * Create employee with photo
   *
   * @author bcueva
   * @param employee Employee
   * @param photo File photo
   * @returns Employee
   */
  createEmployeeWithPhoto(employee: EmployeeManage, photo: File): Observable<Response<Employee>> {
    const formData = new FormData();
    formData.append('file', photo);
    formData.append('data', JSON.stringify(employee));
    return this.post(`/createOrUpdate`, formData);
  }

  /**
   * Get sheet employee
   *
   * @author bcueva
   * @param id
   * @returns
   */
  getEmployeeSheet(id: number): Observable<Response<Employee>> {
    return this.get(`/${id}`);
  }

  /**
   * Get page of employees
   *
   * @author bcueva
   * @param pagination Pagination
   * @param query Simple query
   * @param filters Advanced filters
   * @returns
   */
  page(
    pagination: Pagination,
    query: string,
    filters: EmployeeFilter
  ): Observable<Response<Page<SimpleEmployee>>> {
    return this.post(
      `${EMPLOYEE_PATHS.PAGE}?page=${pagination.currentPage}&size=${pagination.itemsPerPage}&query=${query}`,
      filters
    );
  }

  /**
   * Update projects of employee
   *
   * @author bcueva
   * @param employeeProjects Projects of employee
   * @returns List of projects
   */
  updateProjects(employeeProjects: EmployeeProjects): Observable<Response<Project[]>> {
    return this.post(`${EMPLOYEE_PATHS.UPDATE_PROJECTS}`, employeeProjects);
  }

  /**
   * Update certifications of an Employee
   *
   * @author bcueva
   * @param employeeCertifications Certifications of an employee
   * @returns List of certifications
   */
  updateCertifications(employeeCertifications: EmployeeCertifications): Observable<Response<Certification[]>> {
    return this.post(`${EMPLOYEE_PATHS.UPDATE_CERTIFICATIONS}`, employeeCertifications);
  }

  /**
   * Update skills of an Employee
   *
   * @author bcueva
   * @param employeeSkills Skills of an employee
   * @returns List of skills
   */
  updateSkills(employeeSkills: EmployeeSkills): Observable<Response<Skill[]>> {
    return this.post(`${EMPLOYEE_PATHS.UPDATE_SKILLS}`, employeeSkills);
  }
}
