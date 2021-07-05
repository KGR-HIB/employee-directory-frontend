import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { forkJoin } from "rxjs";

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

import {
  CertificationService,
  CityService,
  DepartmentService,
  PositionService,
  ProjectService,
  SkillService,
} from "@services";

@Component({
  selector: "app-employee-advance-filters",
  templateUrl: "./employee-advance-filters.component.html",
  styleUrls: ["./employee-advance-filters.component.scss"],
})
export class EmployeeAdvanceFiltersComponent implements OnInit {
  @Output() employeeFilter: EventEmitter<EmployeeFilter>;
  @Output() close: EventEmitter<void>;

  positions!: Position[];
  departments!: Department[];
  projects!: Project[];
  cities!: City[];
  skills!: Skill[];
  certifications!: Certification[];
  @Input() filters!: EmployeeFilter;
  clearSelections = false;

  constructor(
    private certificationService: CertificationService,
    private departmentService: DepartmentService,
    private positionService: PositionService,
    private projectService: ProjectService,
    private skillService: SkillService,
    private cityService: CityService
  ) {
    this.employeeFilter = new EventEmitter();
    this.close = new EventEmitter();
  }

  ngOnInit(): void {
    this.getCatalogs();
  }

  private getCatalogs(): void {
    forkJoin([
      this.cityService.findAll(),
      this.positionService.findAll(),
      this.departmentService.findAll(),
      this.certificationService.findAll(),
      this.projectService.findAll(),
      this.skillService.findAll(),
    ]).subscribe((response) => {
      if (response[0]?.data) {
        this.cities = response[0].data;
      }
      if (response[1]?.data) {
        this.positions = response[1].data;
      }
      if (response[2]?.data) {
        this.departments = response[2].data;
      }
      if (response[3]?.data) {
        this.certifications = response[3].data;
      }
      if (response[4]?.data) {
        this.projects = response[4].data;
      }
      if (response[5]?.data) {
        this.skills = response[5].data;
      }
    });
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
