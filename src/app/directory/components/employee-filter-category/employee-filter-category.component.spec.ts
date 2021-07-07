import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeFilterCategoryComponent } from './employee-filter-category.component';

describe('EmployeeFilterCategoryComponent', () => {
  let component: EmployeeFilterCategoryComponent;
  let fixture: ComponentFixture<EmployeeFilterCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeFilterCategoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeFilterCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
