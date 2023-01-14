import { Component, OnInit, ViewChild } from '@angular/core';
import { AdminService } from "../../../core/serivices/admin/admin.service";
import { Column, FetchProvider } from "../../../partials/table/table.component";
import { PaginationQuery } from "../../../core/models";
import { SearchFilterComponent } from "../../../partials/search-filter/search-filter.component";
import { StudentFormComponent } from "../student-form/student-form.component";
import { FormGroup } from "@angular/forms";
import { NzDrawerRef } from "ng-zorro-antd/drawer";
import { StudentViewComponent } from '../student-view/student-view.component';
import { format } from "date-fns";

@Component({
  selector: 'app-students-list',
  templateUrl: './students-list.component.html',
  styleUrls: ['./students-list.component.scss']
})
export class StudentsListComponent {
  @ViewChild(SearchFilterComponent, { static: true }) private _searchFilterComponent!: SearchFilterComponent
  @ViewChild(StudentFormComponent) public _studentFormComponent!: StudentFormComponent
  @ViewChild(StudentViewComponent) public _studentViewComponent!: StudentViewComponent
  @ViewChild('drawer') public drawer!: NzDrawerRef
  loading = false
  rowData: any
  create = false
  view = false
  tabSelected: number = 0;

  constructor(public _adminService: AdminService) {
  }

  fetchProvider: FetchProvider<any> = (query: PaginationQuery) => {
    const search = this._searchFilterComponent.getFilters()
    if (search) {
      query.addParams('keyword', search)
      return this._adminService.searchStudents(query);
    }
    return this._adminService.getStudents(query);
  }

  exportStudents(){
    window.open("https://islamic-cultural-center.herokuapp.com/icc/api/v1/admin/export/students")
  }

  displayColumns = [
    new Column({
      key: 'id',
      title: 'ID',
      width: '100px',
    }),
    new Column({
      key: 'firstName',
      title: 'First Name',
    }),
    new Column({
      key: 'lastName',
      title: 'Last Name',
    }),
    new Column({
      key: 'phoneNumber',
      title: 'Phone Number',
    }),
    new Column({
      key: 'email',
      title: 'Email',
    }),
    new Column({
      key: 'isActive',
      title: 'Is Active',
    })
  ];

  validateForm(form: FormGroup): void {
    for (const key in form.controls) {
      if (form.controls.hasOwnProperty(key)) {
        form.controls[key].markAsTouched();
        form.controls[key].markAsDirty();
        form.controls[key].updateValueAndValidity();
      }
    }
  }

  submitCreateForm() {
    let form: FormGroup;
    form = this._studentFormComponent.form;
    if (form.valid) {
      form.value.dateOfBirth = format(form.value.dateOfBirth, "yyyy-MM-dd")
      
      this.loading = true
      form.disable()
      this._adminService.createStudent(form.value).subscribe({
        next: () => {
          this.loading = false
          this.drawer.close()
          this.create = false
        },
        error: () => {
          form.enable()
          this.loading = false
        }
      })
    }
    else {
      this.validateForm(form);
    }
  }

  submitUpdateForm() {
    let form: FormGroup;
    if (this.tabSelected == 0) {
      form = this._studentViewComponent.detailsForm;
      if (form.valid) {
        this.loading = true
        form.disable()
        this._adminService.updateStudent(this.rowData.id, form.value).subscribe({
          next: () => {
            this.loading = false
            this.drawer.close()
            this.create = false
          },
          error: () => {
            form.enable()
            this.loading = false
          }
        })
      }
      else {
        this.validateForm(form);
      }
    } else if (this.tabSelected == 1) {
      console.log(this.tabSelected);
      
      form = this._studentViewComponent.passwordForm;
      if (form.valid) {
        this.loading = true
        form.disable()
        let obj = {
          id:this.rowData.id,
          ...form.value
        }
        this._adminService.updateStudentPassword(obj).subscribe({
          next: () => {
            this.loading = false
            this.drawer.close()
            this.create = false
          },
          error: () => {
            form.enable()
            this.loading = false
          }
        })
      }
      else {
        this.validateForm(form);
      }
    }
  }

  public clickEvent(data: any) {
    this.view = true;
    this.rowData = data;
    this.drawer.open();
  }

  public clickCreateForm() {
    this.create = true;
    this.drawer.open();
  }

  closeDrawer() {
    this.create = false
    this.view = false
    this.drawer.close()
  }

  tabSwitched(index: number) {
    this.tabSelected = index;    
  }
}
