import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SafeResourceUrl } from '@angular/platform-browser';
import { Employee } from '@models';
import { ImageService } from '@share/services/image.service';

@Component({
  selector: 'app-employee-personal-info',
  templateUrl: './employee-personal-info.component.html',
  styleUrls: ['./employee-personal-info.component.scss']
})
export class EmployeePersonalInfoComponent {

  @Input() employee!: Employee;
  @Input() editable!: boolean;
  @Output() edit!: EventEmitter<boolean>;

  constructor(private imageService: ImageService) {
    this.edit = new EventEmitter();
  }

  get photo(): SafeResourceUrl | string {
    return this.imageService.base64ToResourceUrl(this.employee.photo);
  }

  goToEdit(): void {
    this.edit.emit(true);
  }

}
