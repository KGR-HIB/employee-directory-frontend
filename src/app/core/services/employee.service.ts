import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL, REST_CONTROLLER } from '@constants';
import { Employee, EmployeeFilter, PageEmployees, Response } from '@models';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
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

  listChiefEmployees(queryFilter: string | null): Observable<SimpleEmployee[]> {
    const param = queryFilter && queryFilter.trim() !== '' ? `?query=${queryFilter}` : '';
    return this.get(param).pipe(
      map(response => response.data)
    );
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
