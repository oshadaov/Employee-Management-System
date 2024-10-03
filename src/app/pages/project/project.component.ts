import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IProject } from '../../model/interface/master';
import { MasterService } from '../../service/master.service';

@Component({
  selector: 'app-project',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './project.component.html',
  styleUrl: './project.component.css'
})
export class ProjectComponent implements OnInit{

  projectList : IProject[] = [];
  masterSrv = inject(MasterService)
  ngOnInit(): void {
    this.getProjects();
  }
  getProjects(){
    this.masterSrv.getAllProjects().subscribe((Res : IProject[]) =>{
      this.projectList = Res;
    }
  );
  }
}
