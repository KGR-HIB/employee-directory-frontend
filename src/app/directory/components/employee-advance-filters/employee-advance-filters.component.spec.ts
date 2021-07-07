import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeAdvanceFiltersComponent } from './employee-advance-filters.component';

describe('EmployeeAdvanceFiltersComponent', () => {
  let component: EmployeeAdvanceFiltersComponent;
  let fixture: ComponentFixture<EmployeeAdvanceFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeAdvanceFiltersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeAdvanceFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
