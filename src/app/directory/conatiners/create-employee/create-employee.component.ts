import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { APP_ROUTES } from '@constants';
import { City, Response } from '@models';
import { CityService } from '@services';
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
    private auth: AuthService
  ) {
    if (!this.auth.isAdmin()) {
      this.auth.logOut().subscribe(() => this.router.navigateByUrl(APP_ROUTES.LOGIN).then());
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
