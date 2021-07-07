import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpBaseService } from './http-base.service';
import { Response, Department } from '@models';
import { API_URL, REST_CONTROLLER } from '../constants/api-url.constant';

/**
 * Department service
 *
 * @author bcueva
 * @version 1.0
 */
@Injectable({
  providedIn: 'root'
})
export class DepartmentService extends HttpBaseService {
  constructor(http: HttpClient) {
    super(http, `${API_URL}${REST_CONTROLLER.DEPARTMENT}`);
  }

  /**
   * Find all departments
   *
   * @returns List of departments
   */
  findAll(): Observable<Response<Department[]>> {
    return this.get(`/`);
  }
}
