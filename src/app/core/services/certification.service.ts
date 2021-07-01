import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpBaseService } from './http-base.service';
import { Certification, Response } from '../models';
import { API_URL, REST_CONTROLLER } from '../constants/api-url.constant';

/**
 * Certification service
 *
 * @author bcueva
 * @version 1.0
 */
@Injectable({
  providedIn: 'root'
})
export class CertificationService extends HttpBaseService {

  constructor(http: HttpClient) {
    super(http, `${API_URL}${REST_CONTROLLER.CERTIFICATION}`)
  }

  /**
   * Find all certifications
   *
   * @returns List of certifications
   */
  findAll(): Observable<Response<Certification[]>> {
    return this.get(`/`);
  }
}
