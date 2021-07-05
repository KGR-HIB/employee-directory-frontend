import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/core/services/employee.service';
import { EmployeeFilter } from '../../../core/models/employee-filter.model';
import { Response, SimpleEmployee, Page } from '@models';
import { Pagination } from '@share/models/pagination.model';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent implements OnInit {

  employeesPage!: Page<SimpleEmployee>;
  showFilters: boolean = false;
  filters!: EmployeeFilter;
  pagination: Pagination = new Pagination(20, 5);
  query: string = '';

  constructor(
    private employeeService: EmployeeService
  ) {
    this.employeesPage = {
      data: [],
      currentPage: 0,
      total: 0,
      totalPages: 0
    }
  }

  ngOnInit(): void {
    this.filters = {
      positions: [],
      departments: [],
      projects: [],
      cities: [],
      skills: [],
      certifications: []
    };
    this.seachEmployees();
  }

  onChangePage(event: any): void {
    this.seachEmployees();
  }

  searchByAdvanceFilters(filters: EmployeeFilter): void {
    this.filters = filters;
  }

  clickSearchHandler(query: string): void {
    this.query = query;
    this.seachEmployees();
  }

  clickAdvancedFilerHandler(): void {
    this.showFilters = true;
  }

  clickCloseAdvancedFilerHandler(): void {
    this.showFilters = false;
  }

  private seachEmployees() {
    this.employeeService.page(this.pagination, this.query, this.filters)
    .subscribe((response: Response<Page<SimpleEmployee>>) => {
      const { data: {total, currentPage}} = response;
      if (currentPage === 0) {
        this.pagination.totalItems = total;
      }
      this.employeesPage = response.data;
    });
  }

}
