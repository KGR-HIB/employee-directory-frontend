import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ReplaySubject, Subject } from 'rxjs';
import { debounceTime, filter, finalize, map, takeUntil, tap } from 'rxjs/operators';
import { SimpleEmployee } from '../../../core/models/simple-employee.model';
import { EmployeeService } from '../../../core/services/employee.service';
import { ValidationUtils } from '../../../share/validation.util';

@Component({
  selector: 'app-dropdown-chief',
  templateUrl: './dropdown-chief.component.html',
  styleUrls: ['./dropdown-chief.component.scss']
})
export class DropdownChiefComponent implements OnInit, OnDestroy {

  @Output() selectedData: EventEmitter<SimpleEmployee[]>;

  public employeeCtrl: FormControl = new FormControl();
  public employeeFilteringCtrl: FormControl = new FormControl();
  public searching = false;
  public filteredEmployees: ReplaySubject<SimpleEmployee[]> = new ReplaySubject<SimpleEmployee[]>(1);
  protected _onDestroy = new Subject<void>();

  constructor(private employeeService: EmployeeService) {
    this.selectedData = new EventEmitter();
  }

  ngOnInit() {
    this.employeeFilteringCtrl.valueChanges
      .pipe(
        filter(search => !!search),
        tap(() => this.searching = true),
        takeUntil(this._onDestroy),
        debounceTime(200),
        map(search => search),
        takeUntil(this._onDestroy)
      ).subscribe(filterValue => {
        if (filterValue && filterValue.length < 3) {
          this.filteredEmployees.next([]);
          this.searching = false;
        } else {
          this.employeeService.listChiefEmployees(filterValue).pipe(
            finalize(() => this.searching = false)
          ).subscribe(response => {
            this.filteredEmployees.next(response);
          });
        }
      }, error => {
        this.searching = false;
      });
  }

  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  onSelectionChange(event: any): void {
    this.selectedData.emit(this.employeeCtrl.value);
  }

  isControlHasError(validationType: string): boolean {
    return ValidationUtils.isSingleControlHasError(this.employeeCtrl, validationType);
  }

}
