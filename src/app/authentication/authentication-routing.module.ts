import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './containers/login/login.component';

const ROUTES: Routes = [
  { 
    path: '',   
    redirectTo: '/login', 
    pathMatch: 'full' 
  },
  {
    path: 'login',
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
