import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { API_URL, REST_CONTROLLER, EMPLOYEE_PATHS } from "@constants";
import { Employee, EmployeeFilter, PageEmployees, Response } from "@models";
import { Observable } from "rxjs";
import { MOCKED_PATH } from "../constants/api-url.constant";
import { SimpleEmployee } from "../models/simple-employee.model";
import { HttpBaseService } from "./http-base.service";
import { Page } from "../models/page.model";
import { Pagination } from "@share/models/pagination.model";

@Injectable({
  providedIn: "root",
})
export class EmployeeService extends HttpBaseService {
  constructor(http: HttpClient) {
    super(http, `${API_URL}${REST_CONTROLLER.EMPLOYEE}`);
  }

  page(
    pagination: Pagination,
    query: string,
    filters: EmployeeFilter
  ): Observable<Response<Page<SimpleEmployee>>> {
    return this.post(
      `${EMPLOYEE_PATHS.PAGE}?page=${pagination.currentPage}&size=${pagination.itemsPerPage}&query=${query}`,
      filters
    );
  }

  // TODO: Change response object to Response<SimpleEmployee>
  listChiefEmployees(queryFilter: string | null): Observable<SimpleEmployee[]> {
    const param =
      queryFilter && queryFilter.trim() !== "" ? `?query=${queryFilter}` : "";
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
