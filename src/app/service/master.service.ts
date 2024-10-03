import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IApiResponse, IProject } from '../model/interface/master';
import { Employee } from '../model/class/Employee';

@Injectable({
  providedIn: 'root'
})
export class MasterService {

  apiUrl : string ='https://projectapi.gerasim.in/api/EmployeeManagement/'
  constructor(private http: HttpClient) { }

  getAllDept(): Observable<IApiResponse>{
    return this.http.get<IApiResponse>(`${this.apiUrl}GetParentDepartment`);
  }

  getChildDeptById(deptid:number): Observable<IApiResponse>{
    return this.http.get<IApiResponse>(`${this.apiUrl}GetChildDepartmentByParentId?deptId=${deptid}`);
  }
  saveEmp(obj:Employee): Observable<IApiResponse>{
    debugger;
     return this.http.post<IApiResponse>(`${this.apiUrl}CreateEmployee`,obj);
  }
  getAllEmp(): Observable<Employee[]>{
    return this.http.get<Employee[]>(`${this.apiUrl}GetAllEmployees`);
  }
  updateEmp(obj:Employee): Observable<IApiResponse>{
    debugger;
     return this.http.put<IApiResponse>(this.apiUrl+"UpdateEmployee/"+obj.employeeId,obj);
  }
  deleteEmpById(id : number): Observable<IApiResponse>{
    debugger;
     return this.http.delete<IApiResponse>(this.apiUrl+"DeleteEmployee/"+id);
  }
  saveProject(obj:Employee): Observable<IProject>{
    debugger;
     return this.http.post<IProject>(this.apiUrl+"CreateProject",obj);
  }

  getAllProjects(): Observable<IProject[]>{
    return this.http.get<IProject[]>(`${this.apiUrl}GetAllProjects`);
  }
}


