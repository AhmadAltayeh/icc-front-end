import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NzDrawerRef } from 'ng-zorro-antd/drawer';
import { PaginationQuery } from 'src/app/core/models';
import { InstructorService } from 'src/app/core/serivices/instructor';
import { Column, FetchProvider} from 'src/app/partials/table/table.component';

@Component({
  selector: 'app-view-form',
  templateUrl: './course-view.component.html',
  styleUrls: ['./course-view.component.scss']
})

export class CourseViewComponent implements OnInit {

  @ViewChild('drawer') public drawer!: NzDrawerRef
  @Input() rowData: any = '';
  @Output() tabChanged = new EventEmitter<number>;
  instructorId: any;
  studentId: any;
  detailsForm: FormGroup;
  DAYS = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'];
  ALLDAYS: string[] = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'];
  sem: string[] = ['1st', '2nd'];
  bo: boolean[] = [true, false];

  constructor(private _fb: FormBuilder, public _instructorService: InstructorService) {
    this.detailsForm = this._fb.group({
      name: ['', [Validators.nullValidator]],
      description: ['', [Validators.required]],
      duration: ['', [Validators.required]],
      startDate: ['', [Validators.required]],
      endDate: ['', [Validators.required]],
      lectureTime: ['', [Validators.required]],
      daysOfWeek: ['', [Validators.required]],
      maxParticipants: ['', [Validators.required]],
      category: ['', [Validators.required]],
      isOnline: ['', [Validators.required]],
      price: ['', [Validators.required]],
      classroom: ['', [Validators.required]],
      year: ['', [Validators.required]],
      semester: ['', [Validators.required]],
      teamsLink: ['', [Validators.required]],
      lastRegDay: ['', [Validators.required]],
      isPreRecorded: ['', [Validators.required]],
    })

  }

  ngOnInit(): void {
    console.log(this.rowData.id);
    
    this.fillCourseDetails(this.rowData.id);
  }

  fetchProviderST: FetchProvider<any> = (query: PaginationQuery) => {
    return this._instructorService.getCourseStudents(this.rowData.id);
  }

  getStudentId(event: any) {
    this.studentId = event.target.value;
  }

  displayColumns: Column[] = [];

  displayStudents = [
    new Column({
      key: 'id',
      title: 'ID',
    }),
    new Column({
      key: 'userName',
      title: 'User Name',
    }),
  ];

  public fillCourseDetails(id: number) {    
    this._instructorService.getCourseDetails(this.rowData.courseId).subscribe((json) => {
      this.detailsForm.setValue({
        name: json.data.name,
        description: json.data.description,
        duration: Number(json.data.duration),
        startDate: json.data.startDate,
        endDate: json.data.endDate,
        lectureTime: json.data.lectureTime,
        daysOfWeek: json.data.daysOfWeek,
        maxParticipants: json.data.maxParticipants,
        category: json.data.category,
        isOnline: json.data.isOnline,
        price: Number(json.data.price),
        classroom: json.data.classroom,
        year: json.data.year + "-01-01",
        semester: json.data.semester,
        teamsLink: json.data.teamsLink,
        lastRegDay: json.data.lastRegDay,
        isPreRecorded: json.data.isPreRecorded
      })
    });
  }

  tabChange(args: any[]): void {
    this.tabChanged.emit(args[0].index);
  }
}
