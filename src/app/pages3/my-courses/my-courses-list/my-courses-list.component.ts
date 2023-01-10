import { Component, OnInit, ViewChild } from '@angular/core';
import { AdminService } from '../../../core/serivices/admin/admin.service';
import { StudentService } from 'src/app/core/serivices';
import { Column, FetchProvider } from '../../../partials/table/table.component';
import { PaginationQuery } from '../../../core/models';
import { SearchFilterComponent } from '../../../partials/search-filter/search-filter.component';
import { MyCoursesFormComponent } from '../my-courses-form/my-courses-form.component';
import { FormGroup } from '@angular/forms';
import { NzDrawerRef } from 'ng-zorro-antd/drawer';
import { MyCoursesViewComponent } from '../my-courses-view/my-courses-view.component';
import { Router } from '@angular/router';
@Component({
  selector: 'app-my-courses-list',
  templateUrl: './my-courses-list.component.html',
  styleUrls: ['./my-courses-list.component.scss'],
})
export class MyCoursesListComponent {
  @ViewChild(SearchFilterComponent, { static: true })
  private _searchFilterComponent!: SearchFilterComponent;
  @ViewChild(MyCoursesFormComponent)
  public _courseFormComponent!: MyCoursesFormComponent;
  @ViewChild(MyCoursesViewComponent)
  public _courseViewComponent!: MyCoursesViewComponent;
  @ViewChild('drawer') public drawer!: NzDrawerRef;
  loading = false;
  rowData: any;
  create = false;
  view = false;
  tabSelected: number = 0;

  constructor(public _studentService: StudentService, public _router: Router) {}

  fetchProvider: FetchProvider<any> = (query: PaginationQuery) => {
    // const search = this._searchFilterComponent.getFilters()
    // if (search) {
    //   query.addParams('keyword', search)
    //   return this._studentService.searchCourses(query);
    // }
    return this._studentService.getAllStudentCourses(query);
  };

  displayColumns = [
    new Column({
      key: 'lastRegDay',
      title: 'اخر وقت للتسجيل',
    }),
    new Column({
      key: 'duration',
      title: 'المدة',
    }),
    new Column({
      key: 'lectureTime',
      title: 'الوقت',
    }),
    new Column({
      key: 'classroom',
      title: 'القاعة',
    }),
    new Column({
      key: 'name',
      title: 'اسم المادة',
    }),
    new Column({
      key: 'id',
      title: 'رقم المادة',
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

  public clickEvent(data: any) {
    this.view = true;
    this.rowData = data;
    this._router.navigate([`students/my-courses/view-course/${data.id}`]);
  }

  public clickCreateForm() {
    this.create = true;
    this.drawer.open();
  }

  closeDrawer() {
    this.create = false;
    this.view = false;
    this.drawer.close();
  }

  tabSwitched(index: number) {
    this.tabSelected = index;
  }
}
