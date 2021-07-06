import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { APP_ROUTES, CONSTANTS } from '@constants';
import { City, Response } from '@models';
import { Store } from '@ngrx/store';
import { CityService } from '@services';
import { Observable } from 'rxjs';
import { User } from '../../../core/models/user.model';
import { GlobalState } from '../../../store/app.states';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.scss']
})
export class CreateEmployeeComponent implements OnInit {

  user$: Observable<User | null>;
  user!: User | null;

  constructor(
    private router: Router,
    private cityService: CityService,
    private store: Store<GlobalState>
  ) {
    this.user$ = this.store.select((store) => store.authentication.currentUser);
    this.user$.subscribe(currentUser => this.user = currentUser);
    if (!this.user || this.user.role?.code !== CONSTANTS.ROLES.ADMIN) {
      this.router.navigateByUrl(APP_ROUTES.LOGIN).then();
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
