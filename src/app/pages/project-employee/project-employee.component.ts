import { Component, OnInit,signal,inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IProject, IProjectEmployee } from '../../model/interface/master';
import { MasterService } from '../../service/master.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { Employee } from '../../model/class/Employee';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-project-employee',
  standalone: true,
  imports: [RouterLink,ReactiveFormsModule,AsyncPipe],
  templateUrl: './project-employee.component.html',
  styleUrl: './project-employee.component.css'
})
export class ProjectEmployeeComponent implements OnInit{

  projectEmployeeList = signal<IProjectEmployee[]>([]);
  masterSrv = inject(MasterService)
  form : FormGroup = new FormGroup({})
  projectList$ : Observable<IProject[]> = new Observable<IProject[]>;
  Emplist$ : Observable<Employee[]> = new Observable<Employee[]>
  constructor(){
    this.initializedForm();
    this.projectList$ = this.masterSrv.getAllProjects();
    this.Emplist$ = this.masterSrv.getAllEmp();
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
  onSave() {
    const formValue = this.form.value;


    this.masterSrv.saveProjectEmp(formValue).subscribe((res: IProject) => {
      debugger;
      alert("ProjectEmployee created");
      this.getAllData();   // Call the method to refresh the data
      this.form.reset();   // Reset the form after success

    }, error => {
      alert('API error');  // Show error if something goes wrong
    });
  }

  }

