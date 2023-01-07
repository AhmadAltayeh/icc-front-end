import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/core/serivices';
import { format } from "date-fns";
import { en_US, NzI18nService} from 'ng-zorro-antd/i18n';

@Component({
  selector: 'app-admin-stats',
  templateUrl: './admin-stats.component.html',
  styleUrls: ['./admin-stats.component.scss']
})
export class AdminStatsComponent implements OnInit {
  loading: boolean = false;
  data: any;
  adminCount: number = 0;
  instructorCount: number = 0;
  studentCount: number = 0;
  courseCount: number = 0;
  date = null;
  myDate = new Date();
  constructor(private i18n: NzI18nService, public _adminService: AdminService) {
  }

  ngOnInit(): void {
    this.i18n.setLocale(en_US);
    let date = format(this.myDate, 'yyyy-MM-dd')
    this._adminService.getAdminStats(date).subscribe(json => {
      this.data = json.data;
    })
  }

  admincountstop: any = setInterval(() => {
    this.adminCount++;
    if (this.adminCount == this.data?.adminsCount) {
      clearInterval(this.admincountstop);
    }
  }, 30)

  instructorcountstop: any = setInterval(() => {
    this.instructorCount++;
    if (this.instructorCount == this.data?.instructorsCount) {
      clearInterval(this.instructorcountstop);
    }
  }, 200)

  studentcountstop: any = setInterval(() => {
    this.studentCount++;
    if (this.studentCount == this.data?.studentsCount) {
      clearInterval(this.studentcountstop);
    }
  }, 200)

  coursecountstop: any = setInterval(() => {
    this.courseCount++;
    if (this.courseCount == this.data?.coursesCount) {
      clearInterval(this.coursecountstop);
    }
  }, 200)

  onChange(result: any): void {
    if (result != null) {
      let results = format(result, 'yyyy-MM-dd');
      this._adminService.getAdminStats(results).subscribe(json => {
        this.data = json.data;
        this.adminCount = this.data.adminsCount;
        this.courseCount = this.data.instructorsCount;
        this.studentCount = this.data.studentsCount;
        this.instructorCount = this.data.coursesCount;
      })
    }
    let date = format(this.myDate, 'yyyy-MM-dd')
    this._adminService.getAdminStats(date).subscribe(json => {
      this.data = json.data;
      this.adminCount = this.data.adminsCount;
      this.courseCount = this.data.instructorsCount;
      this.studentCount = this.data.studentsCount;
      this.instructorCount = this.data.coursesCount;
    })
  }
}
