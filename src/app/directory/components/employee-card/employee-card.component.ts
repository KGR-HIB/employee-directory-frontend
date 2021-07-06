import { Component, Input } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
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

  constructor(private domSanitizer: DomSanitizer) {}

  get photo(): SafeResourceUrl | string {
    if (this.employee.photo) {
      return this.domSanitizer.bypassSecurityTrustResourceUrl(`data:image/png;base64,${this.employee.photo}`);
    }
    return 'error_path';
  }
}
