import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { CoreModule } from '../core/core.module';
import { AngularMaterialModule } from '../share/angular-material.module';
import { ShareModule } from '../share/share.module';
import { DropdownChiefComponent } from './components/dropdown-chief/dropdown-chief.component';
import { EmployeeAdvanceFiltersComponent } from './components/employee-advance-filters/employee-advance-filters.component';
import { EmployeeCategoryComponent } from './components/employee-category/employee-category.component';
import { EmployeeFilterCategoryComponent } from './components/employee-filter-category/employee-filter-category.component';
import { EmployeeGenericFilterComponent } from './components/employee-generic-filter/employee-generic-filter.component';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { EmployeePersonalFormComponent } from './components/employee-personal-form/employee-personal-form.component';
import { EmployeePersonalInfoComponent } from './components/employee-personal-info/employee-personal-info.component';
import { CreateEmployeeComponent } from './conatiners/create-employee/create-employee.component';
import { EmployeeComponent } from './conatiners/employee/employee.component';
import { EmployeesComponent } from './conatiners/employees/employees.component';
import { DirectoryRoutingModule } from './directory-routing.module';

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
    EmployeePersonalFormComponent,
    EmployeeFilterCategoryComponent,
    DropdownChiefComponent
  ],
  imports: [
    CommonModule,
    CoreModule,
    ShareModule,
    DirectoryRoutingModule,
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMatSelectSearchModule
  ]
})
export class DirectoryModule { }
