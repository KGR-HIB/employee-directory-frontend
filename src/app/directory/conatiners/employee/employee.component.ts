import { Component, OnInit } from '@angular/core';
import { Certification, Project, Skill } from '@models';
import { Category } from 'src/app/core/models/category.model';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {

  projects!: Project[];
  certifications!: Certification[];
  skills!: Skill[];

  constructor() { }

  ngOnInit(): void {
    this.mockCatalogs();
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

  private mockCatalogs(): void {
    this.certifications = [
      {id: 1, name: 'Certification #1'},
      {id: 2, name: 'Certification #2'},
      {id: 3, name: 'Certification #3'},
      {id: 4, name: 'Certification #4'},
    ];
    this.skills = [
      {id: 1, name: 'Skill 1'},
      {id: 2, name: 'Skill 2'},
      {id: 3, name: 'Skill 3'},
      {id: 4, name: 'Skill 4'},
    ];
    this.projects = [
      {id: 1, name: 'Project 1'},
      {id: 2, name: 'Project 2'},
      {id: 3, name: 'Project 3'},
      {id: 4, name: 'Project 4'},
    ];
  }

}
