import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeesComponent } from './conatiners/employees/employees.component';
import { EmployeeComponent } from './conatiners/employee/employee.component';
import { CreateEmployeeComponent } from './conatiners/create-employee/create-employee.component';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { EmployeeAdvanceFiltersComponent } from './components/employee-advance-filters/employee-advance-filters.component';
import { EmployeeGenericFilterComponent } from './components/employee-generic-filter/employee-generic-filter.component';
import { EmployeePersonalInfoComponent } from './components/employee-personal-info/employee-personal-info.component';
import { EmployeeCategoryComponent } from './components/employee-category/employee-category.component';
import { EmployeePersonalFormComponent } from './components/employee-personal-form/employee-personal-form.component';



@NgModule({
  declarations: [
    EmployeesComponent,
    EmployeeComponent,
    CreateEmployeeComponent,
    EmployeeListComponent,
    EmployeeAdvanceFiltersComponent,
    EmployeeGenericFilterComponent,
    EmployeePersonalInfoComponent,
    EmployeeCategoryComponent,
    EmployeePersonalFormComponent
  ],
  imports: [
    CommonModule
  ]
})
export class DirectoryModule { }
