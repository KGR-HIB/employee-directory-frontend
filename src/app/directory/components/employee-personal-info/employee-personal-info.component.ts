import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Employee } from '@models';

@Component({
  selector: 'app-employee-personal-info',
  templateUrl: './employee-personal-info.component.html',
  styleUrls: ['./employee-personal-info.component.scss']
})
export class EmployeePersonalInfoComponent {

  @Input() employee!: Employee;
  @Input() editable!: boolean;
  @Output() edit!: EventEmitter<boolean>;

  constructor(private domSanitizer: DomSanitizer) {
    this.edit = new EventEmitter();
  }

  get photo(): SafeResourceUrl | string {
    if (this.employee.photo) {
      return this.domSanitizer.bypassSecurityTrustResourceUrl(`data:image/png;base64,${this.employee.photo}`);
    }
    return 'error_path';
  }

  goToEdit(): void {
    this.edit.emit(true);
  }

}
