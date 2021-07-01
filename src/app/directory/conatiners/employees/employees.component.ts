import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/core/services/employee.service';
import { SimpleEmployee } from '../../../core/models/simple-employee.model';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent implements OnInit {

  employees!: SimpleEmployee[];
  constructor(private employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.listEmployees(null);
  }

  private listEmployees(filter: string | null) {
    // TODO: change method to listEmployees
    this.employeeService.listChiefEmployees(filter).subscribe(response => {
      // TODO: get page from response
      this.employees = response;
      console.log(this.employees);
    });
  }

}
