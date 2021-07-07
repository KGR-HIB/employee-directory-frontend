import { Component, Input } from '@angular/core';
import { SafeResourceUrl } from '@angular/platform-browser';
import { SimpleEmployee } from '@models';
import { APP_ROUTES } from '../../../core/constants/app-routes.constant';
import { ImageService } from '@share/services/image.service';


@Component({
  selector: 'app-employee-card',
  templateUrl: './employee-card.component.html',
  styleUrls: ['./employee-card.component.scss']
})
export class EmployeeCard {
  @Input() employee!: SimpleEmployee;
  readonly APP_ROUTES = APP_ROUTES;

  constructor(private imageService: ImageService) {}

  get photo(): SafeResourceUrl | string {
    return this.imageService.base64ToResourceUrl(this.employee.photo);
  }
}
