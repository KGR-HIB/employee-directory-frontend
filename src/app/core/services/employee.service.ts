import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EmployeeFilter, PageEmployees } from '@models';
import { Observable } from 'rxjs';
import { API_URLS } from '../constants/api-url.constant';
import { SimpleEmployee } from '../models/simple-employee.model';
import { Employee, Response } from '@models';
import { REST_CONTROLLER, API_URL } from '@constants';
import { HttpBaseService } from './http-base.service';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService extends HttpBaseService {

  constructor(http: HttpClient) {
    super(http, `${API_URL}${REST_CONTROLLER.EMPLOYEE}`);
  }

  listEmployees(page: number, queryFilter: string, bodyParams: EmployeeFilter): Observable<PageEmployees> {
    const param = queryFilter && queryFilter.trim() !== '' ? `&query=${queryFilter}` : '';
    return this.http.post<PageEmployees>(`${API_URLS.EMPLOYEES}?${page}${param}`, bodyParams);
  }

  // TODO: Change response object to Response<SimpleEmployee>
  listChiefEmployees(queryFilter: string | null): Observable<SimpleEmployee[]> {
    const param = queryFilter && queryFilter.trim() !== '' ? `?query=${queryFilter}` : '';
    return this.http.get<SimpleEmployee[]>(`${API_URLS.EMPLOYEES}${param}`);
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
