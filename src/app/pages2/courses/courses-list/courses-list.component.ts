import { Component, OnInit, ViewChild } from '@angular/core';
import { Column, FetchProvider } from "../../../partials/table/table.component";
import { PaginationQuery } from "../../../core/models";
import { SearchFilterComponent } from "../../../partials/search-filter/search-filter.component";
import { FormGroup } from "@angular/forms";
import { NzDrawerRef } from "ng-zorro-antd/drawer";
import { CourseViewComponent } from '../course-view/course-view.component';
import { InstructorService } from 'src/app/core/serivices/instructor';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.scss']
})
export class CoursesListComponent {
  @ViewChild(SearchFilterComponent, { static: true }) private _searchFilterComponent!: SearchFilterComponent
  @ViewChild(CourseViewComponent) public _courseViewComponent!: CourseViewComponent
  @ViewChild('drawer') public drawer!: NzDrawerRef
  loading = false
  rowData: any
  tabSelected: number = 0;

  constructor(public _instructorService: InstructorService) {
  }

  fetchProvider: FetchProvider<any> = (query: PaginationQuery) => {
    const search = this._searchFilterComponent.getFilters()
    if (search) {
      query.addParams('keyword', search)
      return this._instructorService.searchMyCourses(query);
    }
    return this._instructorService.getMyCourses(query);
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
      key: 'classroom',
      title: 'Classroom',
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

  submitUpdateForm() {
    // let form: FormGroup;
    // if (this.tabSelected == 0) {
    //   form = this._courseViewComponent.detailsForm;
    //   form.value.duration = 0;
    //   if (form.valid) {
    //     this.loading = true
    //     form.disable()
    //     this._instructorService.updateCourse(this.rowData.id, form.value).subscribe({
    //       next: () => {
    //         this.loading = false
    //         this.drawer.close()
    //       },
    //       error: () => {
    //         console.log(form.value)
    //         form.enable()
    //         this.loading = false
    //       }
    //     })
    //   }
    //   else {
    //     this.validateForm(form);
    //   }
    // }
  }


  public clickEvent(data: any) {
    this.rowData = data;
    this.drawer.open();
  }

  public clickCreateForm() {
    this.drawer.open();
  }

  closeDrawer() {
    this.drawer.close()
  }

  tabSwitched(index: number) {
    this.tabSelected = index;
  }
}
