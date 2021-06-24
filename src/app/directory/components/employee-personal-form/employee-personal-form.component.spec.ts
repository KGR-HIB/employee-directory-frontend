import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeePersonalFormComponent } from './employee-personal-form.component';

describe('EmployeePersonalFormComponent', () => {
  let component: EmployeePersonalFormComponent;
  let fixture: ComponentFixture<EmployeePersonalFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeePersonalFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeePersonalFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
