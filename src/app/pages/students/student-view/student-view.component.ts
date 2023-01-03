import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { NzDrawerRef } from 'ng-zorro-antd/drawer';
import {AdminService} from 'src/app/core/serivices';
import { Column } from 'src/app/partials/table/table.component';
import { TableComponent } from 'src/app/partials/table/table.component';
import { PaginationQuery, } from 'src/app/core/models';
import { FetchProvider } from 'src/app/partials/table/table.component';
@Component({
  selector: 'app-view-form',
  templateUrl: './student-view.component.html',
  styleUrls: ['./student-view.component.scss']
})
export class StudentViewComponent implements OnInit {
  @ViewChild('drawer') public drawer!: NzDrawerRef
  @Input() rowData: any = '';
  roleName: string = '';
  tabSelected:number=0
  courseId:any
detailsForm: FormGroup;
passwordForm: FormGroup;
  constructor(private _fb: FormBuilder,public _adminService: AdminService) {
  this.detailsForm = this._fb.group({
    firstName: ['', [Validators.nullValidator]],
    lastName: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    phoneNumber: ['', [Validators.required]],
    dateOfBirth:['', [Validators.required]],
    facebookUrl: ['', [Validators.required]],
  })
  this.passwordForm = this._fb.group({
    newPassword: ['', [Validators.required, Validators.minLength(8), Validators.pattern('(?=.*[A-Z]).{8,20}$')]],
    confirmPassword: ['', [Validators.required, Validators.minLength(8), Validators.pattern('(?=.*[A-Z]).{8,20}$')]]
  })
  }

  ngOnInit(): void {
    console.log(this.rowData);
    this.fillStudentDetails(this.rowData.id);

    
  }
  fetchProvider: FetchProvider<any> = (query: PaginationQuery) => {
    
    return this._adminService.getAllStudentCourses(this.rowData.id);
  }

  displayColumns : Column[] = [];
  displayStudentCoursesColumns = [
    new Column({
      key: 'id',
      title: 'ID',
    }),
    new Column({
      key: 'name',
      title: 'Course Name',
    }),
    new Column({
      key: 'maxParticipants',
      title: 'Max Participants',
    }),
    
    
  ];
  public fillStudentDetails(id:number){
    this._adminService.getOneStudent(this.rowData.id).subscribe((json)=>{
      console.log(json);
      this.detailsForm.setValue({
        firstName: json.data.firstName,
        lastName: json.data.lastName,
        email: json.data.email,
        phoneNumber: json.data.phoneNumber,
        facebookUrl: json.data.facebookUrl,
        dateOfBirth:json.data.dateOfBirth,
      })
    });
  }
  validateForm(form: FormGroup): void {
    for (const key in form.controls) {
      if (form.controls.hasOwnProperty(key)) {
        form.controls[key].markAsTouched();
        form.controls[key].markAsDirty();
        form.controls[key].updateValueAndValidity();
      }
    }
  }
  getCourseId(event:any){
    this.courseId=event.target.value;
  }
  DeleteCourseFromStudent(){
    console.log(this.courseId);
    this._adminService.removeCourseFromStudent({studentId:this.rowData.id,courseId:this.courseId}).subscribe({error(err) {
        console.log(err);
        
    },})
  }
  // tabChange(args: any[]): void {
  //   this.tabChanged.emit(args[0].index);
  // }
  t: TableComponent = new TableComponent;
  Delete(){
    this._adminService.deleteOneStudent(this.rowData.id).subscribe((json)=>{
      console.log(json)
    })
  window.location.reload();
    
  }
  resetStudentPassword(){
    let form: FormGroup;
    form = this.passwordForm;
      if (form.valid) {
        form.disable()
        let obj = {
          id:this.rowData.id,
          ...form.value
        }
        this._adminService.updateStudentPassword(obj).subscribe({
          error: () => {
            form.enable()
          }
        })
      }
  }
  submitUpdateForm() {
    console.log(this.tabSelected);
    
    let form: FormGroup;
    if (this.tabSelected == 0) {
      form = this.detailsForm;
      if (form.valid) {
        form.disable()
        this._adminService.updateStudent(this.rowData.id, form.value).subscribe({
          error: () => {
            form.enable()
          }
        })
      }
      else {
        this.validateForm(form);
      }
    } else if (this.tabSelected == 2) {
      
      form = this.passwordForm;
      if (form.valid) {
        form.disable()
        let obj = {
          id:this.rowData.id,
          ...form.value
        }
        this._adminService.updateStudentPassword(obj).subscribe({
          
          error: () => {
            form.enable()
          }
        })
      }
      else {
        this.validateForm(form);
      }
    }
  }
}
