import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService, StudentService } from 'src/app/core/serivices';
import { Column, FetchProvider } from '../../../partials/table/table.component';
import { Output, EventEmitter } from '@angular/core';
import { PaginationQuery } from 'src/app/core/models';

@Component({
  selector: 'app-my-courses-form',
  templateUrl: './my-courses-form.component.html',
  styleUrls: ['./my-courses-form.component.scss'],
})
export class MyCoursesFormComponent implements OnInit {
  courseId: any;

  ngOnInit(): void {}

  constructor(public _studentService: StudentService) {}
  fetchProvider: FetchProvider<any> = (query: PaginationQuery) => {
    // const search = this._searchFilterComponent.getFilters()
    // if (search) {
    //   query.addParams('keyword', search)
    //   return this._studentService.searchCourses(query);
    // }
    return this._studentService.getAllCourses(query);
  };

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
  getCourseId(event: any) {
    this.courseId = event.target.value;
  }
  enroll() {}
}
