import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NzDrawerRef } from 'ng-zorro-antd/drawer';
import { AdminService } from 'src/app/core/serivices';
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
  @Output() tabChanged = new EventEmitter<number>;
  tabSelected: number = 0
  courseId: any
  detailsForm: FormGroup;
  passwordForm: FormGroup;
  passwordVisible = false;
  passwordVisible2 = false;
  password: any;
  confirmPassword: any;
  listOfData: any[] = [];
  loading = false;

  constructor(private _fb: FormBuilder, public _adminService: AdminService) {
    this.detailsForm = this._fb.group({
      firstName: ['', [Validators.nullValidator]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required]],
      dateOfBirth: ['', [Validators.required]],
      facebookUrl: ['', [Validators.required]],
    })
    this.passwordForm = this._fb.group({
      newPassword: ['', [Validators.required, Validators.minLength(8), Validators.pattern('(?=.*[A-Z]).{8,20}$')]],
      confirmPassword: ['', [Validators.required, Validators.minLength(8), Validators.pattern('(?=.*[A-Z]).{8,20}$')]]
    })
  }

  date = null;
  onChange(result: Date): void {
  }

  ngOnInit(): void {
    this.fillStudentDetails(this.rowData.id);
  }
  fetchProvider: FetchProvider<any> = (query: PaginationQuery) => {
    return this._adminService.getAllStudentCourses(this.rowData.id);
  }

  public fillStudentDetails(id: number) {
    this._adminService.getOneStudent(this.rowData.id).subscribe((json) => {
      console.log(json);
      this.detailsForm.setValue({
        firstName: json.data.firstName,
        lastName: json.data.lastName,
        email: json.data.email,
        phoneNumber: json.data.phoneNumber,
        facebookUrl: json.data.facebookUrl,
        dateOfBirth: json.data.dateOfBirth,
      })
    });

    this._adminService.getAllStudentCourses(this.rowData.id).subscribe((json) => {
      this.listOfData = json.data
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
  getCourseId(event: any) {
    this.courseId = event.target.value;
  }

  DeleteCourseFromStudent(courseId: any) {
    this.loading = true;
    this._adminService.removeCourseFromStudent({ studentId: this.rowData.id, courseId: courseId })
      .subscribe((json) => {
        this.loading = false
        this.fillStudentDetails(this.rowData.id);
      })
  }

  t: TableComponent = new TableComponent;
  Delete() {
    this._adminService.deleteOneStudent(this.rowData.id).subscribe((json) => {
      console.log(json)
    })
    window.location.reload();

  }
  resetStudentPassword() {
    let form: FormGroup;
    form = this.passwordForm;
    if (form.valid) {
      form.disable()
      let obj = {
        id: this.rowData.id,
        ...form.value
      }
      this._adminService.updateStudentPassword(obj).subscribe({
        error: () => {
          form.enable()
        }
      })
    }
  }
  tabChange(args: any[]): void {
    this.tabChanged.emit(args[0].index);
  }
  // submitUpdateForm() {
  //   console.log(this.tabSelected);

  //   let form: FormGroup;
  //   if (this.tabSelected == 0) {
  //     form = this.detailsForm;
  //     if (form.valid) {
  //       form.disable()
  //       this._adminService.updateStudent(this.rowData.id, form.value).subscribe({
  //         error: () => {
  //           form.enable()
  //         }
  //       })
  //     }
  //     else {
  //       this.validateForm(form);
  //     }
  //   } else if (this.tabSelected == 1) {
  //     form = this.passwordForm;
  //     if (form.valid) {
  //       form.disable()
  //       let obj = {
  //         id: this.rowData.id,
  //         ...form.value
  //       }        
  //       this._adminService.updateStudentPassword(obj).subscribe({

  //         error: () => {
  //           form.enable()
  //         }
  //       })
  //     }
  //     else {
  //       this.validateForm(form);
  //     }
  //   }
  // }
}
