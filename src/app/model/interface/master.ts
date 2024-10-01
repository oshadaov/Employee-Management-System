export interface IApiResponse{
  message : string;
  result:  boolean;
  data:any;
}
export interface IParentDept{
  departmentId : number;
  departmentName:  String;
  departmentLogo:String;
}

export interface IChildDept {
  childDeptId:number;
  parentDeptId:string;
  departmentName:string;
}

