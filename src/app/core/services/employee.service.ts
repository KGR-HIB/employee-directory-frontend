import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EmployeeFilter, PageEmployees } from '@models';
import { Observable } from 'rxjs';
import { API_URLS } from '../constants/api-url.constant';
import { SimpleEmployee } from '../models/simple-employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient) {
  }

  listEmployees(page: number, queryFilter: string, bodyParams: EmployeeFilter): Observable<PageEmployees> {
    const param = queryFilter && queryFilter.trim() !== '' ? `&query=${queryFilter}` : '';
    return this.http.post<PageEmployees>(`${API_URLS.EMPLOYEES}?${page}${param}`, bodyParams);
  }

  // TODO: Change response object to ServiceResponse<SimpleEmployee>
  listChiefEmployees(queryFilter: string | null): Observable<SimpleEmployee[]> {
    const param = queryFilter && queryFilter.trim() !== '' ? `?query=${queryFilter}` : '';
    return this.http.get<SimpleEmployee[]>(`${API_URLS.EMPLOYEES}${param}`);
  }
}
