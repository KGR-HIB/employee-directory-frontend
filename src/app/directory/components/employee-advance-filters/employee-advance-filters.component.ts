import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Category, Department, EmployeeFilter, Position, Skill } from '@models';
import { forkJoin } from 'rxjs';
import { Certification } from '../../../core/models/certification.model';
import { City } from '../../../core/models/city.model';
import { Project } from '../../../core/models/project.model';
import { CertificationService } from '../../../core/services/certification.service';
import { CityService } from '../../../core/services/city.service';
import { DepartmentService } from '../../../core/services/department.service';
import { PositionService } from '../../../core/services/position.service';
import { ProjectService } from '../../../core/services/project.service';
import { SkillService } from '../../../core/services/skill.service';

@Component({
  selector: 'app-employee-advance-filters',
  templateUrl: './employee-advance-filters.component.html',
  styleUrls: ['./employee-advance-filters.component.scss']
})
export class EmployeeAdvanceFiltersComponent implements OnInit {

  @Output() employeeFilter: EventEmitter<EmployeeFilter>

  positions!: Position[]
  departments!: Department[]
  projects!: Project[]
  cities!: City[]
  skills!: Skill[]
  certifications!: Certification[];
  selectedFilters!: EmployeeFilter;
  clearSelections = false;

  constructor(
    private certificationService: CertificationService,
    private departmentService: DepartmentService,
    private positionService: PositionService,
    private projectService: ProjectService,
    private skillService: SkillService,
    private cityService: CityService,
  ) {
    this.employeeFilter = new EventEmitter();
  }

  ngOnInit(): void {
    this.selectedFilters = {
      positions: [],
      departments: [],
      projects: [],
      cities: [],
      skills: [],
      certifications: []
    };
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
    this.selectedFilters.positions = filter.map(c => ({ id: c.id, name: c.name }));
    this.clearSelections = false;
  }

  filterByDepartment(filter: Category[]): void {
    this.selectedFilters.departments = filter.map(c => ({ id: c.id, name: c.name }));
    this.clearSelections = false;
  }

  filterByProject(filter: Category[]): void {
    this.selectedFilters.projects = filter.map(c => ({ id: c.id, name: c.name }));
    this.clearSelections = false;
  }

  filterByCity(filter: Category[]): void {
    this.selectedFilters.cities = filter.map(c => ({ id: c.id, name: c.name }));
    this.clearSelections = false;
  }

  filterBySkill(filter: Category[]): void {
    this.selectedFilters.skills = filter.map(c => ({ id: c.id, name: c.name }));
    this.clearSelections = false;
  }

  filterByCertification(filter: Category[]): void {
    this.selectedFilters.certifications = filter.map(c => ({ id: c.id, name: c.name }));
    this.clearSelections = false;
  }

  sendAdvanceFiltersToParent(): void {
    console.log(this.selectedFilters);
    this.employeeFilter.emit(this.selectedFilters);
  }

  clearAdvanceFilters(): void {
    this.clearSelections = true;
    this.sendAdvanceFiltersToParent();
  }

  closeAdvanceFilters(): void { }

}
