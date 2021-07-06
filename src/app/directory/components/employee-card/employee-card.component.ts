import { Component, Input } from '@angular/core';
import { SimpleEmployee } from '@models';
import { APP_ROUTES } from '../../../core/constants/app-routes.constant';


@Component({
  selector: 'app-employee-card',
  templateUrl: './employee-card.component.html',
  styleUrls: ['./employee-card.component.scss']
})
export class EmployeeCard {
  @Input() employee!: SimpleEmployee;
  readonly APP_ROUTES = APP_ROUTES;
}
