import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AdminService } from 'src/app/core/serivices';
import { Column } from "../../../partials/table/table.component";
import { en_US, NzI18nService} from 'ng-zorro-antd/i18n';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss']
})
export class CourseFormComponent implements OnInit {
  days = [];
  allDays = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'];
  times = ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00'];
  smstr: string[] = ['1st', '2nd'];
  blean: boolean[] = [true, false];
  classroms: string[] = ['القاعة الهاشمية', 'قاعة الامام الغزالي', "قاعة الامام البخاري", "قاعة الامام أحمد بن حنبل", "قاعة الامام الشافعي"];
  form: FormGroup


  constructor(private i18n: NzI18nService, private _fb: FormBuilder, public _adminService: AdminService) {
    this.form = this._fb.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      startDate: ['', [Validators.required]],
      endDate: ['', [Validators.required]],
      lectureTime: ['', [Validators.required]],
      daysOfWeek: ['', [Validators.required]],
      maxParticipants: ['', [Validators.required]],
      category: ['', [Validators.required]],
      isOnline: ['', [Validators.required]],
      isFree: ['', [Validators.required]],
      price: ['', [Validators.required]],
      classroom: ['', [Validators.required]],
      year: ['', [Validators.required]],
      semester: ['', [Validators.required]],
      teamsLink: ['', [Validators.required]],
      lastRegDay: ['', [Validators.required]],
      isPreRecorded: ['', [Validators.required]],
      duration: [''],
    })
  }
  displayColumns: Column[] = [];

  ngOnInit(): void {
    this.i18n.setLocale(en_US);
  }

}
