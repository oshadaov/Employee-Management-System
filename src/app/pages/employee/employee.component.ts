import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import CommonModule for directives like *ngFor
import { MasterService } from '../../service/master.service';
import { IApiResponse, IChildDept, IParentDept } from '../../model/interface/master';
import { FormsModule } from '@angular/forms';

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
  childDeptList = signal<IChildDept[]>([]);
  parentDeptId : number = 0;

  ngOnInit(): void {
    this.getParentDept();
  }

  getParentDept() {
    this.masterSrv.getAllDept().subscribe((res: IApiResponse) => {
      this.parentDeptList.set(res.data);
    });
  }
  onParentChange(){
    this.masterSrv.getChildDeptById(this.parentDeptId).subscribe((res: IApiResponse)=>{
      this.childDeptList.set(res.data)
    })
  }
}
