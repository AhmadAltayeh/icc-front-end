import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { NzDrawerRef } from 'ng-zorro-antd/drawer';
import { NzSelectSizeType } from 'ng-zorro-antd/select';
import { PaginationQuery } from 'src/app/core/models';
import {AdminService} from 'src/app/core/serivices';
import { Column, FetchProvider, TableComponent } from 'src/app/partials/table/table.component';
@Component({
  selector: 'app-view-form',
  templateUrl: './course-view.component.html',
  styleUrls: ['./course-view.component.scss']
})
export class CourseViewComponent implements OnInit {

  @ViewChild('drawer') public drawer!: NzDrawerRef
  @Input() rowData: any = '';
  @Output() tabChanged = new EventEmitter<number>;
instructorId:any;
studentId:any;
detailsForm: FormGroup;
  DAYS = ['SUNDAY', 'MONDAY','TUESDAY','WEDNESDAY','THURSDAY','FRIDAY','SATURDAY'];
  ALLDAYS:string[] = ['SUNDAY', 'MONDAY','TUESDAY','WEDNESDAY','THURSDAY','FRIDAY','SATURDAY'];
  sem:string[]=['1st','2nd'];
  bo:boolean[]=[true,false];

  constructor(private _fb: FormBuilder,public _adminService: AdminService) {
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
    isPreRecorded:['', [Validators.required]],
  })
 
  }

  ngOnInit(): void {
    this.fillCourseDetails(this.rowData.id);

    
  }
  fetchProviderIN: FetchProvider<any> = (query: PaginationQuery) => {
    
    return this._adminService.getInstructors(query);
  }
  fetchProviderST: FetchProvider<any> = (query: PaginationQuery) => {
    
    return this._adminService.getStudents(query);
  }
  getInstructorId(event:any){
    this.instructorId=event.target.value;
  }
  addInstructorToCourse(){
    this._adminService.addInstructorToCourse({instructorId:this.instructorId,courseId:this.rowData.id}).subscribe();
  }
  getStudentId(event:any){
    this.studentId=event.target.value;
  }
  addStudentToCourse(){
    console.log("asd");
    
    this._adminService.addStudentToCourse({studentId:this.studentId,courseId:this.rowData.id}).subscribe();
  }

  displayColumns : Column[] = [];
  displayInstructors = [
    new Column({
      key: 'id',
      title: 'ID',
    }),
    new Column({
      key:'firstName',
      title: 'Instructor Name',
    
    }),
    new Column({
      key:'lastName',
      title:'',
      
    }),
   
    
    
  ];
  displayStudents = [
    new Column({
      key: 'id',
      title: 'ID',
    }),
    new Column({
      key:'userName',
      title: 'User Name',
    
    }),
    
  ];

  public fillCourseDetails(id:number){
    this._adminService.getOneCourse(this.rowData.id).subscribe((json)=>{
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
        year: json.data.year+"-01-01",
        semester: json.data.semester,
        teamsLink: json.data.teamsLink,
        lastRegDay: json.data.lastRegDay,
        isPreRecorded:json.data.isPreRecorded
        
      })


    });
  }

  tabChange(args: any[]): void {
    this.tabChanged.emit(args[0].index);
  }
  t: TableComponent = new TableComponent;
  Delete(){
    this._adminService.deleteOneCourse(this.rowData.id).subscribe((json)=>{
      console.log(json)
    })
  window.location.reload();
    
  }
}
