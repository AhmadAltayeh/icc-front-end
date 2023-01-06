import { Component, OnInit } from '@angular/core';
import { AnimationModel } from '@syncfusion/ej2-angular-progressbar';
import { AdminService } from 'src/app/core/serivices';

@Component({
  selector: 'app-admin-stats',
  templateUrl: './admin-stats.component.html',
  styleUrls: ['./admin-stats.component.scss']
})
export class AdminStatsComponent implements OnInit {
  loading: boolean = false;
  data: any;
  adminCount:number = 0;
  instructorCount:number = 0;
  studentCount:number = 0;
  courseCount:number = 0;
  public animation:AnimationModel | undefined;
  constructor(public _adminService: AdminService) {}

  ngOnInit(): void {
    this.animation = { enable: true, duration: 2000, delay: 0 };
    this._adminService.getAdminStats().subscribe(json => {
      this.data = json.data;
    })
  }

admincountstop:any = setInterval(()=>{
  this.adminCount++;
  if(this.adminCount ==this.data.adminsCount)
  {
    clearInterval(this.admincountstop);
  }
},30)

instructorcountstop:any = setInterval(()=>{
  this.instructorCount++;
  if(this.instructorCount == this.data.instructorsCount)
  {
    clearInterval(this.instructorcountstop);
  }
},200)

studentcountstop:any = setInterval(()=>{
  this.studentCount++;
  if(this.studentCount == this.data.studentsCount)
  {
    clearInterval(this.studentcountstop);
  }
},200)

coursecountstop:any = setInterval(()=>{
  this.courseCount++;
  if(this.courseCount == this.data.coursesCount)
  {
    clearInterval(this.coursecountstop);
  }
},200)

}
