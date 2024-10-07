import { Component,inject, OnInit } from '@angular/core';
import { MasterService } from '../../service/master.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{

  dashboardData : any;

  masterSrv = inject(MasterService)
  ngOnInit(): void {
      this.masterSrv.getDashBoardData().subscribe((Res:any)=>{
        this.dashboardData = Res;
      })
  }
}
