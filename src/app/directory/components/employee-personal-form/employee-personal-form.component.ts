import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VALIDATIONS } from '@constants';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { City } from 'src/app/core/models/city.model';
import { Department } from 'src/app/core/models/department.model';
import { Position } from 'src/app/core/models/position.model';
import { SimpleEmployee } from 'src/app/core/models/simple-employee.model';
import { APP_ROUTES } from '../../../core/constants/app-routes.constant';
import { ValidationUtils } from '../../../share/validation.util';

@Component({
  selector: 'app-employee-personal-form',
  templateUrl: './employee-personal-form.component.html',
  styleUrls: ['./employee-personal-form.component.scss']
})
export class EmployeePersonalFormComponent implements OnInit {

  formGroup!: FormGroup;
  isHiddenPassword = true;
  loading!: boolean;
  filteredCities!: Observable<City[]>;
  cities!: City[];
  filteredPositions!: Observable<Position[]>;
  positions!: Position[];
  filteredDepartments!: Observable<Department[]>;
  departments!: Department[];
  chiefs!: SimpleEmployee[];

  readonly APP_ROUTES = APP_ROUTES;

  constructor(
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.mockCatalogs();
    this.createFormFields();
    this.autocCityListener();
    this.autocDepartmentListener();
    this.autocPositionListener();
  }

  private createFormFields() {
    this.formGroup = this.formBuilder.group({
      mail: [null, Validators.compose([
        Validators.required,
        Validators.pattern(VALIDATIONS.EMAIL_REGEX),
      ])],
      password: [null, Validators.compose([
        Validators.required
      ])],
      name: [null, Validators.compose([
        Validators.required
      ])],
      lastName: [null, Validators.compose([
        Validators.required
      ])],
      phone: [null, Validators.compose([
        Validators.required
      ])],
      department: [null, Validators.compose([
        Validators.required
      ])],
      position: [null, Validators.compose([
        Validators.required
      ])],
      city: [null, Validators.compose([
        Validators.required
      ])],
      chief: [null, Validators.compose([
        Validators.required
      ])],
    });
  }

  private autocCityListener() {
    this.filteredCities = this.formGroup.controls.city.valueChanges
      .pipe(
        startWith(''),
        map(value => this.filterCity(value))
      );
  }

  private filterCity(value: string): City[] {
    const filterValue = value.toLowerCase();
    return this.cities.filter(option => option.name.toLowerCase().includes(filterValue));
  }

  private autocDepartmentListener() {
    this.filteredDepartments = this.formGroup.controls.department.valueChanges
      .pipe(
        startWith(''),
        map(value => this.filterDepartment(value))
      );
  }

  private filterDepartment(value: string): Department[] {
    const filterValue = value.toLowerCase();
    return this.departments.filter(option => option.name.toLowerCase().includes(filterValue));
  }

  private autocPositionListener() {
    this.filteredPositions = this.formGroup.controls.position.valueChanges
      .pipe(
        startWith(''),
        map(value => this.filterPosition(value))
      );
  }

  private filterPosition(value: string): Position[] {
    const filterValue = value.toLowerCase();
    return this.positions.filter(option => option.name.toLowerCase().includes(filterValue));
  }

  save() {
    // Validate form data
    const controls = this.formGroup.controls;
    if (this.formGroup.invalid) {
      Object.keys(controls).forEach(controlName =>
        controls[controlName].markAsTouched()
      );
      return;
    }
    this.loading = true;
  }

  isControlHasError(controlName: string, validationType: string): boolean {
    return ValidationUtils.isControlHasError(this.formGroup, controlName, validationType);
  }

  private mockCatalogs(): void {
    this.cities = [
      {cityId: 1, name: 'Quito'},
      {cityId: 2, name: 'Las Tunas'},
      {cityId: 3, name: 'Jobabo'},
      {cityId: 4, name: 'Otabalo'},
    ];
    this.positions = [
      {positionId: 1, name: 'Quito'},
      {positionId: 2, name: 'Las Tunas'},
      {positionId: 3, name: 'Jobabo'},
      {positionId: 4, name: 'Otabalo'},
    ];
    this.departments = [
      {departmentId: 1, name: 'Quito'},
      {departmentId: 2, name: 'Las Tunas'},
      {departmentId: 3, name: 'Jobabo'},
      {departmentId: 4, name: 'Otabalo'},
    ];
    this.chiefs = [
      {
        employeeId: 1,
        name: 'Jose',
        lastName: 'Leon',
        mail: 'email',
        phone: '',
        departmentName: '',
        positionName: '',
        photo: '',
      },
      {
        employeeId: 2,
        name: 'Fulano',
        lastName: 'De Tal',
        mail: 'email',
        phone: '',
        departmentName: '',
        positionName: '',
        photo: '',
      }
    ];
  }

}
