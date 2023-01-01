  import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { AdminService } from 'src/app/core/serivices';
import {Column, FetchProvider} from "../../../partials/table/table.component";
import { Output,EventEmitter } from '@angular/core';


@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss']
})
export class CourseFormComponent implements OnInit {
  DAYS = ['SUNDAY', 'MONDAY','TUESDAY','WEDNESDAY','THURSDAY','FRIDAY','SATURDAY'];
  ALLDAYS:string[] = ['SUNDAY', 'MONDAY','TUESDAY','WEDNESDAY','THURSDAY','FRIDAY','SATURDAY'];
  sem:string[]=['1st','2nd'];
  bo:boolean[]=[true,false];

form: FormGroup
  constructor(private _fb: FormBuilder, public _adminService:AdminService) {
  this.form = this._fb.group({name: ['', [Validators.nullValidator]],
    description: ['', [Validators.required]],
    duration: ['', [Validators.required]],
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
    isPreRecorded:['', [Validators.required]],
 
  })
  }

  displayColumns : Column[] = [];

  ngOnInit(): void {

}
  
}
