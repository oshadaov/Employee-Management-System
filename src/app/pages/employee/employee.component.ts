import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import CommonModule for directives like *ngFor
import { MasterService } from '../../service/master.service';
import { IApiResponse, IChildDept, IParentDept } from '../../model/interface/master';
import { FormsModule } from '@angular/forms';
import { Employee } from '../../model/class/Employee';

@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [FormsModule], // Import CommonModule here for ngFor, ngIf, etc.
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'] // Corrected 'styleUrl' to 'styleUrls'
})
export class EmployeeComponent implements OnInit {

  isFormVisible = signal<boolean>(false);
  masterSrv = inject(MasterService);
  parentDeptList = signal<IParentDept[]>([]);
  employeetList = signal<Employee[]>([]);
  childDeptList = signal<IChildDept[]>([]);
  parentDeptId : number = 0;
  employeeObj: Employee = new Employee();
  ngOnInit(): void {
    this.getParentDept();
    this.getEmployees();
  }

  getParentDept() {
    this.masterSrv.getAllDept().subscribe((res: IApiResponse) => {
      this.parentDeptList.set(res.data);
    });
  }
  getEmployees() {
    this.masterSrv.getAllEmp().subscribe((res:Employee[]) => {
      this.employeetList.set(res);
    });
  }
  onParentChange(){
    this.masterSrv.getChildDeptById(this.parentDeptId).subscribe((res: IApiResponse)=>{
      this.childDeptList.set(res.data)
    })
  }
  onSave(){
    debugger;
    this.masterSrv.saveEmp(this.employeeObj).subscribe((res : IApiResponse)=>{
      debugger;
       alert("Employee Created")
      this.getEmployees();
      this.employeeObj = new Employee();
    },error =>{
      alert("Api error")
    })
  }
  onEdit(data : Employee){
    this.employeeObj = data;
    this.isFormVisible.set(true)
  }
  onUpdate(){

    this.masterSrv.updateEmp(this.employeeObj).subscribe((res : IApiResponse)=>{
      debugger;
       alert("Employee Updated")
      this.getEmployees();
      this.employeeObj = new Employee();

    },error =>{
      alert('Api error')
    })
  }
  
  onDelete(id:number ){
    const isDelete = confirm("Are you sure want to Delete")
    if(isDelete){
      this.masterSrv.deleteEmpById(id).subscribe((res : IApiResponse)=>{
        debugger;
         alert("Employee deleted")
      this.getEmployees();

      },error =>{
        alert('Api error')
      })
    }
  }
}
