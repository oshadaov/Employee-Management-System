import { Component, OnInit,signal,inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IProject, IProjectEmployee } from '../../model/interface/master';
import { MasterService } from '../../service/master.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-project-employee',
  standalone: true,
  imports: [RouterLink,ReactiveFormsModule],
  templateUrl: './project-employee.component.html',
  styleUrl: './project-employee.component.css'
})
export class ProjectEmployeeComponent implements OnInit{

  projectEmployeeList = signal<IProjectEmployee[]>([]);
  masterSrv = inject(MasterService)
  form : FormGroup = new FormGroup({})
  projectList$ : Observable<IProject[]> = new Observable<IProject[]>;

  constructor(){
    this.initializedForm();
    this.projectList$ = this.masterSrv.getAllProjects();     
  }

  ngOnInit(): void{
    this.getAllData();
  }
  initializedForm(){
    this.form = new FormGroup({
    empProjectId: new FormControl(0),
    projectId: new FormControl(0),
    empId : new FormControl(0),
    assignedDate: new FormControl(''),
    role: new FormControl(''),
    isActive: new FormControl('')
    })
  }

  getAllData(){
    this.masterSrv.getProjectEmp().subscribe((Res:IProjectEmployee[])=>{
      this.projectEmployeeList.set(Res)
    })
  }
}
