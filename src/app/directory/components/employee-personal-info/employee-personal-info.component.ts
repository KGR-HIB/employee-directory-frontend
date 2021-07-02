import { Component, Input, OnInit } from '@angular/core';
import { Employee } from '@models';
import { APP_ROUTES } from '../../../core/constants/app-routes.constant';

@Component({
  selector: 'app-employee-personal-info',
  templateUrl: './employee-personal-info.component.html',
  styleUrls: ['./employee-personal-info.component.scss']
})
export class EmployeePersonalInfoComponent implements OnInit {

  @Input() employee!: Employee;

  readonly APP_ROUTES = APP_ROUTES;
  
  constructor() { }

  ngOnInit(): void {
  }

}
