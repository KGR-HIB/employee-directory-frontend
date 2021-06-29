import { Component, OnInit } from '@angular/core';
import { APP_ROUTES } from '../../../core/constants/app-routes.constant';

@Component({
  selector: 'app-employee-personal-info',
  templateUrl: './employee-personal-info.component.html',
  styleUrls: ['./employee-personal-info.component.scss']
})
export class EmployeePersonalInfoComponent implements OnInit {

  readonly APP_ROUTES = APP_ROUTES;
  
  constructor() { }

  ngOnInit(): void {
  }

}
