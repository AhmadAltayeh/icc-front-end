import { Component, OnInit, ViewChild } from '@angular/core';
import { AdminService } from "../../../core/serivices/admin/admin.service";
import { Column, FetchProvider } from "../../../partials/table/table.component";
import { PaginationQuery } from "../../../core/models";
import { SearchFilterComponent } from "../../../partials/search-filter/search-filter.component";
import { CourseFormComponent } from "../course-form/course-form.component";
import { FormGroup } from "@angular/forms";
import { NzDrawerRef } from "ng-zorro-antd/drawer";
import { CourseViewComponent } from '../course-view/course-view.component';
import { format } from "date-fns";


@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.scss']
})
export class CoursesListComponent {
  @ViewChild(SearchFilterComponent, { static: true }) private _searchFilterComponent!: SearchFilterComponent
  @ViewChild(CourseFormComponent) public _courseFormComponent!: CourseFormComponent
  @ViewChild(CourseViewComponent) public _courseViewComponent!: CourseViewComponent
  @ViewChild('drawer') public drawer!: NzDrawerRef
  loading = false
  rowData: any
  create = false
  view = false
  tabSelected: number = 0;
  disabled = false;

  constructor(public _adminService: AdminService) {
  }

  fetchProvider: FetchProvider<any> = (query: PaginationQuery) => {
    const search = this._searchFilterComponent.getFilters()
    if (search) {
      query.addParams('keyword', search)
      return this._adminService.searchCourses(query);
    }
    return this._adminService.getCourses(query);
  }

  displayColumns = [
    new Column({
      key: 'id',
      title: 'ID',
      width: '100px',
    }),
    new Column({
      key: 'name',
      title: 'Course Name',
    }),
    new Column({
      key: 'lectureTime',
      title: 'Lecture Time',
    }),
    new Column({
      key: 'startDate',
      title: 'Start Date',
    }),
    new Column({
      key: 'endDate',
      title: 'End Date',
    }),
    new Column({
      key: 'category',
      title: 'Category',
    }),
    new Column({
      key: 'price',
      title: 'Price',
    }),
    new Column({
      key: 'isActive',
      title: 'Is Active',
    }),
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

  exportCourses(){
    window.open("https://islamic-cultural-center.herokuapp.com/icc/api/v1/admin/export/courses")
  }

  submitCreateForm() {
    let form: FormGroup;
    form = this._courseFormComponent.form

    if (form.valid) {
      this.loading = true
      form.disable()
      form.value.startDate = format(form.value.startDate, "yyyy-MM-dd")
      form.value.endDate = format(form.value.endDate, "yyyy-MM-dd")
      form.value.lastRegDay = format(form.value.lastRegDay, "yyyy-MM-dd")
      form.value.year = format(form.value.year, "yyyy-MM-dd")
      form.value.duration = 1;
      this._adminService.createCourse(form.value).subscribe({
        next: () => {
          this.loading = false
          this.drawer.close()
          this.create = false;

        },
        error: () => {
          console.log("Error")
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
      form = this._courseViewComponent.detailsForm;
      form.value.startDate = format(form.value.startDate, "yyyy-MM-dd")
      form.value.endDate = format(form.value.endDate, "yyyy-MM-dd")
      form.value.lastRegDay = format(form.value.lastRegDay, "yyyy-MM-dd")
      form.value.year = format(form.value.year, "yyyy-MM-dd")
      form.value.duration = 1;
      if (form.valid) {
        this.loading = true
        form.disable()
        this._adminService.updateCourse(this.rowData.id, form.value).subscribe({
          next: () => {
            this.loading = false
            this.drawer.close()
            this.create = false
          },
          error: () => {
            console.log(form.value)
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
