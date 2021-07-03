import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/core/services/employee.service';
import { EmployeeFilter } from '../../../core/models/employee-filter.model';
import { SimpleEmployee } from '../../../core/models/simple-employee.model';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent implements OnInit {

  employees!: SimpleEmployee[];
  totalEmployees!: number;
  advanceFilters!: EmployeeFilter;
  simpleFilter = '';

  constructor(
    private employeeService: EmployeeService
  ) { }

  ngOnInit(): void {
    this.advanceFilters = {
      positions: [],
      departments: [],
      projects: [],
      cities: [],
      skills: [],
      certifications: []
    };
    // this.listEmployees('', this.advanceFilters);
  }

  private listEmployees(filterText: string, filterBody: EmployeeFilter, page = 1) {
    this.employeeService.listEmployees(filterText, filterBody, page).subscribe(response => {
      this.employees = response.data.employes;
      this.totalEmployees = response.data.total;
      console.log(this.employees);
    });
  }

  searchByAdvanceFilters(filters: EmployeeFilter): void {
    this.advanceFilters = filters;
    this.listEmployees(this.simpleFilter, this.advanceFilters);
  }

}
