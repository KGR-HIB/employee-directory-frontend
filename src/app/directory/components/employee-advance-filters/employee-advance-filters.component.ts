import { Component, EventEmitter, Input, Output } from "@angular/core";
import {
  Certification,
  City,
  Project,
  Category,
  Department,
  EmployeeFilter,
  Position,
  Skill,
} from "@models";

@Component({
  selector: "app-employee-advance-filters",
  templateUrl: "./employee-advance-filters.component.html",
  styleUrls: ["./employee-advance-filters.component.scss"],
})
export class EmployeeAdvanceFiltersComponent {
  @Input() filters!: EmployeeFilter;
  @Input() positions!: Position[];
  @Input() departments!: Department[];
  @Input() projects!: Project[];
  @Input() cities!: City[];
  @Input() skills!: Skill[];
  @Input() certifications!: Certification[];

  @Output() employeeFilter: EventEmitter<EmployeeFilter>;
  @Output() close: EventEmitter<void>;
  clearSelections = false;

  constructor() {
    this.employeeFilter = new EventEmitter();
    this.close = new EventEmitter();
  }

  filterByPosition(filter: Category[]): void {
    console.log(filter);
    this.filters.positions = filter.map((c) => c.id);
    this.clearSelections = false;
  }

  filterByDepartment(filter: Category[]): void {
    this.filters.departments = filter.map((c) => c.id);
    this.clearSelections = false;
  }

  filterByProject(filter: Category[]): void {
    this.filters.projects = filter.map((c) => c.id);
    this.clearSelections = false;
  }

  filterByCity(filter: Category[]): void {
    this.filters.cities = filter.map((c) => c.id);
    this.clearSelections = false;
  }

  filterBySkill(filter: Category[]): void {
    this.filters.skills = filter.map((c) => c.id);
    this.clearSelections = false;
  }

  filterByCertification(filter: Category[]): void {
    this.filters.certifications = filter.map((c) => c.id);
    this.clearSelections = false;
  }

  sendAdvanceFiltersToParent(): void {
    this.employeeFilter.emit(this.filters);
  }

  clearAdvanceFilters(): void {
    this.clearSelections = true;
    this.filters.positions = [];
    this.filters.departments = [];
    this.filters.projects = [];
    this.filters.cities = [];
    this.filters.skills = [];
    this.filters.certifications = [];
    this.sendAdvanceFiltersToParent();
  }

  closeAdvanceFilters(): void {
    this.close.emit();
  }
}
