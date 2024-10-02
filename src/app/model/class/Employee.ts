export class Employee {
  employeeId: number;
  employeeName: string;
  contactNo: string;
  emailId: string;
  parentDeptId:number;
  deptId: number;
  password: string;
  gender: string;
  role: string;


  constructor(){
    this.contactNo ='';
    this.employeeId=0;
    this.deptId = 0;
    this.parentDeptId=0;
    this.emailId ='';
    this.employeeName='';
    this.password='';
    this.role='';
    this.gender = ';'
  }
}
