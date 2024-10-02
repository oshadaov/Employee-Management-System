import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { Employee } from '../../model/class/Employee';
import { MasterService } from '../../service/master.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-project-form',
  standalone: true,
  imports: [RouterLink,ReactiveFormsModule,AsyncPipe],
  templateUrl: './project-form.component.html',
  styleUrl: './project-form.component.css'
})
export class ProjectFormComponent {

  projectForm : FormGroup = new FormGroup({});

  employeeList: Observable<Employee[]> = new Observable<[]>;
  masterSrv= inject(MasterService);

  constructor(){
    this.initializeForm();
  }

  initializeForm(){
    this.projectForm = new FormGroup({
      projectId : new FormControl(0),
      projectName : new FormControl('',[Validators.required]),
      clientName: new FormControl(''),
      startDate: new FormControl(''),
      leadByEmpId: new FormControl(''),
      contactPerson: new FormControl(''),
      contactNo: new FormControl(''),
      emailId: new FormControl(''),
    })
  }

}
