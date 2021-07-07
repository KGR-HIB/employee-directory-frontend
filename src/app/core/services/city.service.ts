import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpBaseService } from './http-base.service';
import { City, Response } from '../models';
import { API_URL, REST_CONTROLLER } from '../constants/api-url.constant';

/**
 * CityService
 *
 * @author bcueva
 * @version 1.0
 */
@Injectable({
  providedIn: 'root'
})
export class CityService extends HttpBaseService {

  constructor(http: HttpClient) {
    super(http, `${API_URL}${REST_CONTROLLER.CITY}`);
  }

  /**
   * Find all cities
   *
   * @returns List of cities
   */
  findAll(): Observable<Response<City[]>> {
    return this.get(`/`);
  }
}
