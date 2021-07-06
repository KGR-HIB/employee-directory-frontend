import { Location } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { APP_ROUTES, VALIDATIONS } from '@constants';
import { City, Department, Employee, EmployeeManage, Position, SimpleEmployee } from '@models';
import { CityService, DepartmentService, EmployeeService, PositionService } from '@services';
import { forkJoin, Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ValidationUtils } from '../../../share/validation.util';
import { ImageUtil } from '@share/util/image.util';

@Component({
  selector: 'app-employee-personal-form',
  templateUrl: './employee-personal-form.component.html',
  styleUrls: ['./employee-personal-form.component.scss']
})
export class EmployeePersonalFormComponent implements OnInit {

  @Input() employee!: Employee;
  @Output() edited!: EventEmitter<boolean>;

  formGroup!: FormGroup;
  isHiddenPassword = true;
  filteredCities!: Observable<City[]>;
  cities!: City[];
  filteredPositions!: Observable<Position[]>;
  positions!: Position[];
  filteredDepartments!: Observable<Department[]>;
  departments!: Department[];
  chiefs!: SimpleEmployee[];
  markRequired!: boolean;
  enablePassword = false;
  photo!: File;

  readonly APP_ROUTES = APP_ROUTES;

  constructor(
    private employeeService: EmployeeService,
    private cityService: CityService,
    private positionService: PositionService,
    private departmentService: DepartmentService,
    private formBuilder: FormBuilder,
    private location: Location,
    private router: Router,
    private alert: ToastrService
  ) {
    this.edited = new EventEmitter();
  }

  ngOnInit(): void {
    this.getCatalogs();
    this.createFormFields();
  }

  get currentPhoto(): string | null {
    if(this.employee) {
      return this.employee.photo;
    }
    return null;
  }

  private createFormFields() {
    this.formGroup = this.formBuilder.group({
      email: [null, Validators.compose([
        Validators.required,
        Validators.pattern(VALIDATIONS.EMAIL_REGEX),
      ])],
      password: [null, null],
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
      chief: [null, null],
    });
    this.fillExistingEmployeeData();
  }

  private async fillExistingEmployeeData(): Promise<void> {
    if (this.employee) {
      this.formGroup.controls.name.setValue(this.employee.name);
      this.formGroup.controls.lastName.setValue(this.employee.lastName);
      this.formGroup.controls.email.setValue(this.employee?.user?.email);
      this.formGroup.controls.email.disable();
      this.formGroup.controls.password.disable();
      this.formGroup.controls.phone.setValue(this.employee.phone);
      this.formGroup.controls.city.setValue(this.employee.city.name);
      this.formGroup.controls.department.setValue(this.employee.department.name);
      this.formGroup.controls.position.setValue(this.employee.position.name);
      this.formGroup.controls.chief.setValue(this.employee.immediateChief);
      this.photo = await ImageUtil.base64ToFile(`data:image/png;base64,${this.employee.photo}`);
    }
  }

  setPasswordState(slide: MatSlideToggleChange) {
    if (slide.checked) {
      this.formGroup.controls.password.enable();
      return;
    }
    this.formGroup.controls.password.disable();
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
    if ((!this.employee || this.enablePassword) && !this.formGroup.controls.password.value) {
      this.formGroup.controls.password.setErrors({ required: true });
      this.formGroup.controls.password.markAsTouched();
    } else {
      this.formGroup.controls.password.setErrors({ required: null });
      this.formGroup.controls.password.updateValueAndValidity();
    }
    const controls = this.formGroup.controls;
    if (this.formGroup.invalid) {
      Object.keys(controls).forEach(controlName =>
        controls[controlName].markAsTouched()
      );
      return;
    }

    if (!this.photo) {
      this.alert.error('La foto es requerida, por favor verifique.');
      return;
    }

    const data: EmployeeManage = {
      id: this.employee?.id,
      name: controls.name.value,
      lastName: controls.lastName.value,
      phone: controls.phone.value,
      department: { name: controls.department.value },
      position: { name: controls.position.value },
      city: { name: controls.city.value },
      immediateChiefId: controls.chief.value.id,
      user: {
        id: this.employee?.user?.id,
        email: controls.email.value,
        password: controls.password.value,
        roleId: 1
      }
    }
    this.employeeService.createEmployeeWithPhoto(data, this.photo).subscribe(response => {
      if (response?.data?.id && !this.employee) {
        if (!this.employee) {
          this.router.navigate([APP_ROUTES.EMPLOYEE, response.data.id]);
          return;
        }
        console.log('Emiting success editing');
        this.edited.emit(true);
      }
    });
  }

  cancel(): void {
    if (!this.employee) {
      this.location.back();
      return;
    }
    this.edited.emit(false);
  }

  isControlHasError(controlName: string, validationType: string): boolean {
    return ValidationUtils.isControlHasError(this.formGroup, controlName, validationType);
  }

  setSelectedChief(event: any): void {
    this.formGroup.controls.chief.setValue(event)
  }

  private getCatalogs(): void {
    forkJoin([
      this.cityService.findAll(),
      this.positionService.findAll(),
      this.departmentService.findAll(),
    ]).subscribe((response) => {
      if (response[0]?.data) {
        this.cities = response[0].data;
        this.autocCityListener();
      }
      if (response[1]?.data) {
        this.positions = response[1].data;
        this.autocPositionListener();
      }
      if (response[2]?.data) {
        this.departments = response[2].data;
        this.autocDepartmentListener();
      }
    });
  }

  loadedFileImageHandler(file: File) {
    this.photo = file;
  }

}
