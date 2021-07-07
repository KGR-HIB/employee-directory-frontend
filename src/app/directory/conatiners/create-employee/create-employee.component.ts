import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { APP_ROUTES } from '@constants';
import { City, Response } from '@models';
import { CityService } from '@services';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.scss']
})
export class CreateEmployeeComponent implements OnInit {

  constructor(
    private router: Router,
    private cityService: CityService,
    private auth: AuthService,
    private alert: ToastrService
  ) {
    if (!this.auth.isAdmin()) {
      this.router.navigateByUrl(APP_ROUTES.EMPLOYEES).then();
      this.alert.error('No tiene acceso al recurso solicitado.');
    }
  }

  ngOnInit(): void {
    this.fetchCities();
  }

  private fetchCities(): void {
    this.cityService.findAll()
      .subscribe((response: Response<City[]>) => {
        console.log(response.data);
      });
  }

}
