import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpBaseService } from './http-base.service';
import { Project, Response } from '../models';
import { API_URL, REST_CONTROLLER } from '../constants/api-url.constant';

/**
 * Project service
 *
 * @author bcueva
 * @version 1.0
 */
@Injectable({
  providedIn: 'root'
})
export class ProjectService extends HttpBaseService {

  constructor(http: HttpClient) {
    super(http, `${API_URL}${REST_CONTROLLER.CITY}`);
  }

  /**
   * Find all projects
   *
   * @returns List of projects
   */
  findAll(): Observable<Response<Project[]>> {
    return this.get(`/`);
  }
}
