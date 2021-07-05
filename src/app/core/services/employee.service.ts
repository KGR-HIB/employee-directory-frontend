import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL, REST_CONTROLLER } from '@constants';
import { Employee, EmployeeFilter, EmployeeManage, PageEmployees, Response } from '@models';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SimpleEmployee } from '../models/simple-employee.model';
import { HttpBaseService } from './http-base.service';

@Injectable({
  providedIn: "root",
})
export class EmployeeService extends HttpBaseService {
  constructor(http: HttpClient) {
    super(http, `${API_URL}${REST_CONTROLLER.EMPLOYEE}`);
  }

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
   * Get list of employees with resumed data
   * 
   * @param queryFilter : Parametter to filter employees
   * @returns 
   */
  listChiefEmployees(queryFilter: string | null): Observable<SimpleEmployee[]> {
    const param = queryFilter && queryFilter.trim() !== '' ? `?query=${queryFilter}` : '';
    return this.get(param).pipe(
      map(response => response.data)
    );
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
   * Get sheet employee
   *
   * @author bcueva
   * @param id
   * @returns
   */
  getEmployeeSheet(id: number): Observable<Response<Employee>> {
    return this.get(`/${id}`);
  }
}
