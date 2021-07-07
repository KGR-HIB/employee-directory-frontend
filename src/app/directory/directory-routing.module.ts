import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { APP_ROUTES } from '../core/constants/app-routes.constant';
import { AuthGuard } from '../core/guards/auth.guard';
import { CreateEmployeeComponent } from './conatiners/create-employee/create-employee.component';
import { EmployeeComponent } from './conatiners/employee/employee.component';
import { EmployeesComponent } from './conatiners/employees/employees.component';

const ROUTES: Routes = [
  {
    path: APP_ROUTES.EMPLOYEES,
    component: EmployeesComponent,
    canActivate: [AuthGuard],
  },
  {
    path: `${APP_ROUTES.EMPLOYEE}/:id`,
    component: EmployeeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: APP_ROUTES.EMPLOYEE_CREATION,
    component: CreateEmployeeComponent,
    canActivate: [AuthGuard],
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
export class DirectoryRoutingModule { }
