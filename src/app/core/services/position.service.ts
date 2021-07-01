import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpBaseService } from './http-base.service';
import { Position, Response } from '../models';
import { API_URL, REST_CONTROLLER } from '../constants/api-url.constant';

/**
 * Position service
 *
 * @author bcueva
 * @version 1.0
 */
@Injectable({
  providedIn: 'root'
})
export class PositionService extends HttpBaseService {
  constructor(http: HttpClient) {
    super(http, `${API_URL}${REST_CONTROLLER.POSITION}`);
  }

  /**
   * Find all positions
   *
   * @returns List of positions
   */
  findAll(): Observable<Response<Position[]>> {
    return this.get(`/`);
  }
}
