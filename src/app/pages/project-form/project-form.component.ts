import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { Employee } from '../../model/class/Employee';
import { MasterService } from '../../service/master.service';
import { AsyncPipe } from '@angular/common';
import { IProject } from '../../model/interface/master';

@Component({
  selector: 'app-project-form',
  standalone: true,
  imports: [RouterLink,ReactiveFormsModule,AsyncPipe],
  templateUrl: './project-form.component.html',
  styleUrl: './project-form.component.css'
})
export class ProjectFormComponent {

  projectForm : FormGroup = new FormGroup({});

  emplList$: Observable<Employee[]> = new Observable<[]>;
  masterSrv= inject(MasterService);
  activatedRouter = inject(ActivatedRoute)

  constructor(){
    this.emplList$ = this.masterSrv.getAllEmp();
    this.initializeForm();
    this.activatedRouter.params.subscribe((res:any)=>{
      if(res.id !=0){
        this.getProject(res.id)
      }
    })
  }

  initializeForm(data?:IProject){
    this.projectForm = new FormGroup({
      projectId : new FormControl(data ? data.projectId:0),
      projectName : new FormControl(data ? data.projectName:''),
      clientName: new FormControl(data ? data.clientName:''),
      startDate: new FormControl(data ? data.startDate:''),
      leadByEmpId: new FormControl(data ? data.leadByEmpId:''),
      contactPerson: new FormControl(data ? data.contactPerson:''),
      contactNo: new FormControl(data ? data.contactNo:''),
      emailId: new FormControl(data ? data.emailId:''),
    })
  }
 getProject(id:number){
    this.masterSrv.getProjectById(id).subscribe((res : IProject)=>{
      debugger;

       this.initializeForm(res)

    },error =>{
      alert('Api error')
    })
  }
  onSaveProject(){
    const formValue = this.projectForm.value;
    this.masterSrv.saveProject(formValue).subscribe((res : IProject)=>{
      debugger;
       alert("Project created")

       this.projectForm.reset();

    },error =>{
      alert('Api error')
    })
  }
  onUpdate(){
    const formValue = this.projectForm.value;
    this.masterSrv.saveProject(formValue).subscribe((res : IProject)=>{
      debugger;
       alert("Employee Updated")

       this.projectForm.reset();

    },error =>{
      alert('Api error')
    })
  }
}
