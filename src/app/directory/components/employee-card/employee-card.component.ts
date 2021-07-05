import { Component, Input } from '@angular/core';

import { SimpleEmployee } from '@models';

@Component({
  selector: 'app-employee-card',
  templateUrl: './employee-card.component.html',
  styleUrls: ['./employee-card.component.scss']
})
export class EmployeeCard {
  @Input() employee!: SimpleEmployee;
}
