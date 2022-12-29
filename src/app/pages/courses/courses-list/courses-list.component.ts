import {Component, OnInit, ViewChild} from '@angular/core';
import {AdminService} from "../../../core/serivices/admin/admin.service";
import {Column, FetchProvider} from "../../../partials/table/table.component";
import {PaginationQuery} from "../../../core/models";
import {SearchFilterComponent} from "../../../partials/search-filter/search-filter.component";
import {CourseFormComponent} from "../course-form/course-form.component";
import {FormGroup} from "@angular/forms";
import {NzDrawerRef} from "ng-zorro-antd/drawer";
import {CourseViewComponent} from '../course-view/course-view.component';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.scss']
})
export class CoursesListComponent {
  @ViewChild(SearchFilterComponent, {static: true}) private _searchFilterComponent!: SearchFilterComponent
  @ViewChild(CourseFormComponent) public _courseFormComponent!: CourseFormComponent
  @ViewChild(CourseViewComponent) public _courseViewComponent!: CourseViewComponent
  @ViewChild('drawer') public drawer!: NzDrawerRef
  loading = false
  rowData: any

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

  submitForm() {
    const form = this._courseFormComponent.form
    if (form.valid) {
      this.loading = true
      form.disable()
      this._adminService.createAdmin(form.value).subscribe({
        next: () => {
          this.loading = false
          this.drawer.close()
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
  public clickEvent(data: any){    
    this.rowData = data;
    this.drawer.open();
}
  formClick=false
  viewClick=false
  public onClick(name: string, data?:any){
    if(name == "form"){
      this.formClick=true;
      this.drawer.open();
    }
    else{
      this.rowData = data;
      this.viewClick=true
      this.drawer.open();
    }

  }
  
}
