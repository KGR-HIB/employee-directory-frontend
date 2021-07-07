import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { APP_ROUTES } from '../core/constants/app-routes.constant';
import { LoginComponent } from './containers/login/login.component';

const ROUTES: Routes = [
  { 
    path: '',   
    redirectTo: `/${APP_ROUTES.LOGIN}`, 
    pathMatch: 'full' 
  },
  {
    path: APP_ROUTES.LOGIN,
    component: LoginComponent,
  },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
  ],
  exports: [RouterModule]
})
export class AuthenticationRoutingModule { }
