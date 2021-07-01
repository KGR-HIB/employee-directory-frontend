import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpBaseService } from './http-base.service';
import { Response, Skill } from '../models';
import { API_URL, REST_CONTROLLER } from '../constants/api-url.constant';

/**
 * Skill service
 *
 * @author bcueva
 * @version 1.0
 */
@Injectable({
  providedIn: 'root'
})
export class SkillService extends HttpBaseService {
  constructor(http: HttpClient) {
    super(http, `${API_URL}${REST_CONTROLLER.SKILL}`);
  }

  /**
   * Find all skills
   *
   * @returns List of skills
   */
  findAll(): Observable<Response<Skill[]>> {
    return this.get(`/`);
  }
}
