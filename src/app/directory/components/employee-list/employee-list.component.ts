import { Component, Input, OnInit } from '@angular/core';
import { SimpleEmployee } from '../../../core/models/simple-employee.model';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit {

  @Input() employees!: SimpleEmployee[];

  constructor() { }

  ngOnInit(): void {
  }

}
