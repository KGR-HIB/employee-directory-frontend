import { Component, OnInit } from "@angular/core";
import { forkJoin } from "rxjs";
import {
  Certification,
  City,
  Department,
  EmployeeFilter,
  Page,
  Project,
  Position,
  Response,
  SimpleEmployee,
  Skill
} from "@models";
import {
  CertificationService,
  CityService,
  DepartmentService,
  EmployeeService,
  PositionService,
  ProjectService,
  SkillService
} from '@services';
import { Pagination } from "@share/models/pagination.model";

@Component({
  selector: "app-employees",
  templateUrl: "./employees.component.html",
  styleUrls: ["./employees.component.scss"],
})
export class EmployeesComponent implements OnInit {
  employeesPage!: Page<SimpleEmployee>;
  showFilters: boolean = false;
  filters!: EmployeeFilter;
  pagination: Pagination = new Pagination(20, 5);
  query: string = "";

  // Catalogs
  positions!: Position[];
  departments!: Department[];
  projects!: Project[];
  cities!: City[];
  skills!: Skill[];
  certifications!: Certification[];

  constructor(
    private employeeService: EmployeeService,
    private certificationService: CertificationService,
    private departmentService: DepartmentService,
    private positionService: PositionService,
    private projectService: ProjectService,
    private skillService: SkillService,
    private cityService: CityService
    ) {
    this.employeesPage = {
      data: [],
      currentPage: 0,
      total: 0,
      totalPages: 0,
    };
    this.filters = {
      positions: [],
      departments: [],
      projects: [],
      cities: [],
      skills: [],
      certifications: [],
    };
  }

  ngOnInit(): void {
    this.seachEmployees();
    this.getCatalogs();
  }

  onChangePage(): void {
    this.seachEmployees();
  }

  searchByAdvanceFilters(filters: EmployeeFilter): void {
    this.filters = filters;
  }

  clickSearchHandler(): void {
    this.seachEmployees();
  }

  clickSearchAdvancedFilterHandler() {
    this.seachEmployees();
  }

  clickAdvancedFilerHandler(): void {
    this.showFilters = true;
  }

  clickCloseAdvancedFilerHandler(): void {
    this.showFilters = false;
  }

  private seachEmployees() {
    this.employeeService
      .page(this.pagination, this.query, this.filters)
      .subscribe((response: Response<Page<SimpleEmployee>>) => {
        const {
          data: { total, currentPage },
        } = response;
        if (currentPage === 0) {
          this.pagination.totalItems = total;
        }
        this.employeesPage = response.data;
      });
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
}
