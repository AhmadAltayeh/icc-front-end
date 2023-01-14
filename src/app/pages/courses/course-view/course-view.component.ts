import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NzDrawerRef } from 'ng-zorro-antd/drawer';
import { en_US, NzI18nService } from 'ng-zorro-antd/i18n';
import { PaginationQuery } from 'src/app/core/models';
import { AdminService } from 'src/app/core/serivices';
import { TableComponent } from 'src/app/partials/table/table.component';
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
  days = [];
  times = ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00'];
  allDays: string[] = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'];
  classroms: string[] = ['classroom 01', 'classroom 02'];
  smstr: string[] = ['1st', '2nd'];
  blean: boolean[] = [true, false];
  instructorsData : any[] = [];
  studentsData : any[] = [];
  loading: boolean = false;
  isVisible = false;
  selectedStudentId: any;
  courseInstructors : any[] = [];
  selectedInstructorValue:any

  constructor(private i18n: NzI18nService, private _fb: FormBuilder, public _adminService: AdminService) {
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
      isFree: ['', [Validators.required]],
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
    this.i18n.setLocale(en_US);
    this.fillCourseDetails(this.rowData.id);
  }

  getInstructorId(event: any) {
    this.instructorId = event.target.value;
  }

  addInstructorToCourse(instructorId : number) {
    this._adminService.addInstructorToCourse({ instructorId: instructorId, courseId: this.rowData.id }).subscribe(() => {
      this.drawer.close();
    });
  }

  getStudentId(event: any) {
    this.studentId = event.target.value;
  }

  addStudentToCourse() {
    this._adminService.addStudentToCourse({instructorId:this.selectedInstructorValue, studentId: this.selectedStudentId, courseId: this.rowData.id }).subscribe();
  }

  oneTquery = new PaginationQuery(0,100000);


  public fillCourseDetails(id: number) {
    this._adminService.getOneCourse(this.rowData.id).subscribe((json) => {
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
        isFree: json.data.isFree,
        price: Number(json.data.price),
        classroom: json.data.classroom,
        year: json.data.year,
        semester: json.data.semester,
        teamsLink: json.data.teamsLink,
        lastRegDay: json.data.lastRegDay,
        isPreRecorded: json.data.isPreRecorded
      })
      this.courseInstructors = json.data.instructors;
    });

    this._adminService.getInstructors(this.oneTquery).subscribe((json) => {
      this.instructorsData = json.data
    });


    this._adminService.getStudents(this.oneTquery).subscribe((json1) => {      
      this.studentsData = json1.data
    });
  }

  tabChange(args: any[]): void {
    this.tabChanged.emit(args[0].index);
  }
  t: TableComponent = new TableComponent;

  Delete() {
    this._adminService.deleteOneCourse(this.rowData.id).subscribe((json) => {
    })
    window.location.reload();
  }

  showModal(id: number): void {
    this.isVisible = true;
    this.selectedStudentId = id;
  }

  handleOk(instructorId : any): void {
    if(this.selectedInstructorValue){
      console.log(this.selectedInstructorValue);
      this.isVisible = false;
      this.addStudentToCourse()
    }
  }

  handleCancel(): void {
    this.isVisible = false;
  }
  selectedInstructor(event:any){
    console.log(event);
  }
}
