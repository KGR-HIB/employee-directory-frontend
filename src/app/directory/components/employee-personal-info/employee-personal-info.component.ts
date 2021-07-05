import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Employee } from '@models';

@Component({
  selector: 'app-employee-personal-info',
  templateUrl: './employee-personal-info.component.html',
  styleUrls: ['./employee-personal-info.component.scss']
})
export class EmployeePersonalInfoComponent {

  @Input() employee!: Employee;
  @Output() edit!: EventEmitter<boolean>;

  constructor() {
    this.edit = new EventEmitter();
  }

  goToEdit(): void {
    this.edit.emit(true);
  }

}
