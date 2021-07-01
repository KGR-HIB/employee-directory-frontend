import { Component, OnInit } from '@angular/core';

import { City, Response } from '@models';
import { CityService } from '@services';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.scss']
})
export class CreateEmployeeComponent implements OnInit {

  constructor(
    private cityService: CityService
  ) { }

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
