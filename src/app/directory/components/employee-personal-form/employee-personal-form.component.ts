import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VALIDATIONS } from '@constants';
import { CityService, DepartmentService, PositionService } from '@services';
import { forkJoin, Observable } from 'rxjs';
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
    private cityService: CityService,
    private positionService: PositionService,
    private departmentService: DepartmentService,
    private formBuilder: FormBuilder,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getCatalogs();
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

  cancel(): void {
    this.location.back();
  }

  isControlHasError(controlName: string, validationType: string): boolean {
    return ValidationUtils.isControlHasError(this.formGroup, controlName, validationType);
  }

  private getCatalogs(): void {
    forkJoin([
      this.cityService.findAll(),
      this.positionService.findAll(),
      this.departmentService.findAll(),
    ]).subscribe((response) => {
      if (response[0]?.data) {
        this.cities = response[0].data;
      }
      if (response[1]?.data) {
        this.positions = response[1].data;
      }
      if (response[2]?.data) {
        this.departments = response[2].data;
      }
    });
    this.chiefs = []; // TODO: call chiefs endpoint
  }

}
