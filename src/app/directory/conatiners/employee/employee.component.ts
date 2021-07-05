import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Category, Certification, Employee, Project, Response, Skill } from '@models';
import { CertificationService, EmployeeService, ProjectService, SkillService } from '@services';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {

  employee!: Employee
  skills!: Skill[];
  projects!: Project[];
  certifications!: Certification[];
  isEditionMode!: boolean;

  constructor(
    private skillService: SkillService,
    private projectService: ProjectService,
    private certificationService: CertificationService,
    private employeeService: EmployeeService,
    private activeRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.activeRoute.params.subscribe(params => this.fetchEmployeeSheet(params.id));
    this.getCatalogs();
  }

  private fetchEmployeeSheet(id: number) {
    this.employeeService.getEmployeeSheet(id)
      .subscribe((response: Response<Employee>) => {
        this.employee = response.data;
        this.isEditionMode = false;
      });
  }

  getCatalogs(): void {
    forkJoin([
      this.skillService.findAll(),
      this.projectService.findAll(),
      this.certificationService.findAll()
    ]).subscribe(response => {
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

  updateProjects(projects: Category[]): void {
    // TODO: call service
    console.log(projects);
  }

  updateCertifications(certifications: Category[]): void {
    // TODO: call service
    console.log(certifications);
  }

  updateSkills(skills: Category[]): void {
    // TODO: call service
    console.log(skills);
  }

  goToPrincipalInfoEdition(edit: boolean): void {
    this.isEditionMode = edit;
  }

  managePrincipalInfoEdition(edited: boolean): void {
    this.isEditionMode = edited;
    if (edited) {
      this.fetchEmployeeSheet(this.employee.id);
    }
  }

}
