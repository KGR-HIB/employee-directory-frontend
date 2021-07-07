import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import {
  Category,
  Certification,
  Employee,
  EmployeeCertifications,
  EmployeeProjects,
  EmployeeSkills,
  Project,
  Response,
  Skill,
  User
} from "@models";
import {
  CertificationService,
  EmployeeService,
  ProjectService,
  SkillService
} from "@services";
import { forkJoin } from 'rxjs';
import { UserEmployee } from '../../../core/models/user-employee.model';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: "app-employee",
  templateUrl: "./employee.component.html",
  styleUrls: ["./employee.component.scss"],
})
export class EmployeeComponent implements OnInit {
  
  employee!: Employee;
  skills!: Skill[];
  projects!: Project[];
  certifications!: Certification[];
  isEditionMode!: boolean;
  isCurrentUserAdmin!: boolean;
  currentUser!: User | null;
  isEditable!: boolean;

  constructor(
    private skillService: SkillService,
    private projectService: ProjectService,
    private certificationService: CertificationService,
    private employeeService: EmployeeService,
    private activeRoute: ActivatedRoute,
    private auth: AuthService
  ) {
    this.isCurrentUserAdmin = this.auth.isAdmin();
    this.currentUser = this.auth.currentUserValue;
  }

  ngOnInit(): void {
    this.activeRoute.params.subscribe((params) =>
      this.fetchEmployeeSheet(params.id)
    );
    this.getCatalogs();
  }

  private fetchEmployeeSheet(id: number, updateCurrentUserData = false) {
    this.employeeService
      .getEmployeeSheet(id)
      .subscribe((response: Response<Employee>) => {
        this.employee = response.data;
        this.isEditionMode = false;
        this.isEditable = this.userCanEdit();
        if (updateCurrentUserData) {
          const employeeData: UserEmployee = {
            id: this.employee.id,
            name: this.employee.name,
            lastName: this.employee.lastName,
            photo: this.employee.photo
          };
          this.auth.updateCurrentUserValue({...this.currentUser, employe: employeeData });
        }
      });
  }

  userCanEdit(): boolean {
    return this.isCurrentUserAdmin || this.currentUser?.id === this.employee?.user?.id;
  }

  getCatalogs(): void {
    forkJoin([
      this.skillService.findAll(),
      this.projectService.findAll(),
      this.certificationService.findAll(),
    ]).subscribe((response) => {
      if (response[0]?.data) {
        this.skills = response[0].data;
      }
      if (response[1]?.data) {
        this.projects = response[1].data;
      }
      if (response[2]?.data) {
        this.certifications = response[2].data;
      }
    });
  }

  /**
   * Update project of an Employee
   *
   * @author bcueva
   * @param projects List of Projects
   */
  updateProjects(projects: Category[]): void {
    const employeeProjets: EmployeeProjects = {
      employeeId: this.employee.id,
      projects
    };
    this.employeeService.updateProjects(employeeProjets)
    .subscribe((response: Response<Project[]>) => {
      this.employee.projects = response.data;
    });
  }

  /**
   * Update certifications of an Employee
   *
   * @author bcueva
   * @param certifications List of Certifications
   */
  updateCertifications(certifications: Category[]): void {
    const employeeCertifications: EmployeeCertifications = {
      employeeId: this.employee.id,
      certifications
    };
    this.employeeService.updateCertifications(employeeCertifications)
    .subscribe((response: Response<Certification[]>) => {
      this.employee.certifications = response.data;
    });
  }

  /**
   * Update skills of an Employee
   *
   * @author bcueva
   * @param skills List of skills
   */
  updateSkills(skills: Category[]): void {
    const employeeSkills: EmployeeSkills = {
      employeeId: this.employee.id,
      skills
    };
    this.employeeService.updateSkills(employeeSkills)
    .subscribe((response: Response<Skill[]>) => {
      this.employee.skills = response.data;
    });
  }

  goToPrincipalInfoEdition(edit: boolean): void {
    this.isEditionMode = edit;
  }

  managePrincipalInfoEdited(edited: boolean): void {
    this.isEditionMode = edited;
    if (edited) {
      this.fetchEmployeeSheet(this.employee.id, this.currentUser?.employe?.id === this.employee.id);
    }
  }
}
