import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialModule } from '../share/angular-material.module';
import { AuthenticationRoutingModule } from './authentication-routing.module';
import { LoginComponent } from './containers/login/login.component';


@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    AuthenticationRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class AuthenticationModule { }
