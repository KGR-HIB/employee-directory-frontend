import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeGenericFilterComponent } from './employee-generic-filter.component';

describe('EmployeeGenericFilterComponent', () => {
  let component: EmployeeGenericFilterComponent;
  let fixture: ComponentFixture<EmployeeGenericFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeGenericFilterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeGenericFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
