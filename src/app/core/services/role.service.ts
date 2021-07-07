import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { HttpBaseService } from "./http-base.service";
import { Role, Response } from "../models";
import { API_URL, REST_CONTROLLER } from "../constants/api-url.constant";

/**
 * Service of roles
 *
 * @author bcueva
 * @version 1.0
 */
 @Injectable({
  providedIn: 'root'
})
export class RoleService extends HttpBaseService {
  constructor(http: HttpClient) {
    super(http, `${API_URL}${REST_CONTROLLER.ROLE}`);
  }

  /**
   * Find all roles
   *
   * @returns List of roles
   */
  findAll(): Observable<Response<Role[]>> {
    return this.get(`/`);
  }
}
