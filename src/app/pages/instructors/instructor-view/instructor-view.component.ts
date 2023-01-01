import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AdminService } from 'src/app/core/serivices';
import { Column, FetchProvider, TableComponent } from 'src/app/partials/table/table.component';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { Observable, Observer } from 'rxjs';
import { NzMessageService } from 'ng-zorro-antd/message';
import { PaginationQuery } from 'src/app/core/models';

@Component({
  selector: 'app-view-form',
  templateUrl: './instructor-view.component.html',
  styleUrls: ['./instructor-view.component.scss']
})
export class InstructorViewComponent implements OnInit {
  @Input() rowData: any = '';
  @Output() tabChanged = new EventEmitter<number>;
  detailsForm: FormGroup
  passwordForm: FormGroup
  radioValue: any = '';
  loading = false;
  imageUrl?: string;
  constructor(private _fb: FormBuilder, public _adminService: AdminService, private msg: NzMessageService) {
    this.detailsForm = this._fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required]],
      facebookUrl: ['', [Validators.required]],
      imageUrl: ['String', [Validators.required]],
      isVolunteer: ['', [Validators.required]],
      salary: ['', Validators.nullValidator]
    })
    this.passwordForm = this._fb.group({
      newPassword: ['', [Validators.required, Validators.minLength(8), Validators.pattern('(?=.*[A-Z]).{8,20}$')]],
      confirmPassword: ['', [Validators.required, Validators.minLength(8), Validators.pattern('(?=.*[A-Z]).{8,20}$')]]
    })
  }

  ngOnInit(): void {
    this.fillInstructorDetails(this.rowData.id);
  }

  displayColumns: Column[] = [];

  fetchProvider: FetchProvider<any> = (query: PaginationQuery) => {
    return this._adminService.getInstructorCourses(query, this.rowData.id);
  }

  displayCourseColumns = [
    new Column({
      key: 'id',
      title: 'ID',
      width: '100px',
    }),
    new Column({
      key: 'name',
      title: 'Name',
    }),
    new Column({
      key: 'startDate',
      title: 'Start Date',
    }),
    new Column({
      key: 'endDate',
      title: 'End Date',
    })
  ];
  courseId:any
  getCourseId(event:any){
    this.courseId=event;
  }
  removeCourseFromInstructor(){
    this._adminService.removeCourseFromInstructor({instructorId:this.rowData.id,courseId:this.courseId}).subscribe()
  }

  public fillInstructorDetails(id: number) {    
    this._adminService.getOneInstructor(this.rowData.id).subscribe((json) => {
      this.radioValue = json.data.isVolunteer

      console.log(json.data.isVolunteer);


      this.detailsForm.patchValue({
        firstName: json.data.firstName,
        lastName: json.data.lastName,
        email: json.data.email,
        phoneNumber: json.data.phoneNumber,
        facebookUrl: json.data.facebookUrl,
        imageUrl: json.data.iamgeUrl,
        isVolunteer: json.data.isVolunteer,
        salary: json.data.salary,
      })
    });
  }

  tabChange(args: any[]): void {
    this.tabChanged.emit(args[0].index);
  }
  t: TableComponent = new TableComponent;
  Delete() {
    this._adminService.deleteOneAdmin(this.rowData.id).subscribe((json) => {
      console.log(json)
    })
    window.location.reload();

  }

  beforeUpload = (file: NzUploadFile, _fileList: NzUploadFile[]): Observable<boolean> =>
  new Observable((observer: Observer<boolean>) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      this.msg.error('You can only upload JPG file!');
      observer.complete();
      return;
    }
    const isLt2M = file.size! / 1024 / 1024 < 2;
    if (!isLt2M) {
      this.msg.error('Image must smaller than 2MB!');
      observer.complete();
      return;
    }
    observer.next(isJpgOrPng && isLt2M);
    observer.complete();
  });

private getBase64(img: File, callback: (img: string) => void): void {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result!.toString()));
  reader.readAsDataURL(img);
}

handleChange(info: { file: NzUploadFile }): void {
  switch (info.file.status) {
    case 'uploading':
      this.loading = true;
      break;
    case 'done':
      // Get this url from response in real world.
      this.getBase64(info.file!.originFileObj!, (img: string) => {
        this.loading = false;
        this.imageUrl = img;
      });
      break;
    case 'error':
      this.msg.error('Network error');
      this.loading = false;
      break;
  }
}
}
