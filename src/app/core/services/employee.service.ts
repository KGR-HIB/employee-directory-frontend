import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL, REST_CONTROLLER } from '@constants';
import { Employee, EmployeeFilter, PageEmployees, Response } from '@models';
import { Observable } from 'rxjs';
import { MOCKED_PATH } from '../constants/api-url.constant';
import { SimpleEmployee } from '../models/simple-employee.model';
import { HttpBaseService } from './http-base.service';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService extends HttpBaseService {

  constructor(http: HttpClient) {
    super(http, `${API_URL}${REST_CONTROLLER.EMPLOYEE}`);
  }

  listEmployees(queryFilter: string | null, bodyParams: EmployeeFilter | {}, page: number = 1): Observable<Response<PageEmployees>> {
    const param = queryFilter && queryFilter.trim() !== '' ? `&query=${queryFilter}` : '';
    return this.post(`/page?${page}${param}`, bodyParams);
  }

  // TODO: Change response object to Response<SimpleEmployee>
  listChiefEmployees(queryFilter: string | null): Observable<SimpleEmployee[]> {
    const param = queryFilter && queryFilter.trim() !== '' ? `?query=${queryFilter}` : '';
    return this.http.get<SimpleEmployee[]>(`${MOCKED_PATH}${param}`);
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
