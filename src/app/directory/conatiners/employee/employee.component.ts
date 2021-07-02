import { Component, OnInit } from '@angular/core';
import { Category, Certification, Employee, Project, Skill } from '@models';
import { CertificationService, ProjectService, SkillService } from '@services';
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

  constructor(
    private skillService: SkillService,
    private projectService: ProjectService,
    private certificationService: CertificationService,
  ) { }

  ngOnInit(): void {
    // TODO: call endpoint to get employee
    this.getCatalogs();
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

}
