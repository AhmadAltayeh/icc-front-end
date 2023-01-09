import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzDrawerRef } from 'ng-zorro-antd/drawer';
import { NzSelectSizeType } from 'ng-zorro-antd/select';
import { PaginationQuery } from 'src/app/core/models';
import { AdminService, StudentService } from 'src/app/core/serivices';
import { ActivatedRoute } from '@angular/router';
import {
  Column,
  FetchProvider,
  TableComponent,
} from 'src/app/partials/table/table.component';
@Component({
  selector: 'app-view-form',
  templateUrl: './my-courses-view.component.html',
  styleUrls: ['./my-courses-view.component.scss'],
})
export class MyCoursesViewComponent implements OnInit {
  @ViewChild('drawer') public drawer!: NzDrawerRef;
  @Input() rowData: any = '';
  courseId: any;
  courseData: any;
  selectedValue: any;
  selectedValueId: any;
  s: string[] = [];
  constructor(
    private _fb: FormBuilder,
    public _studentService: StudentService,
    private _activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getCourse();
  }

  getCourse() {
    this.courseId = Number(this._activatedRoute.snapshot.paramMap.get('id'));
    this._studentService.getOneCourse(this.courseId).subscribe((json) => {
      this.courseData = json.data;
      console.log(this.courseData);
      this.selectedValueId = this.courseData.instructors[0].id;
    });
  }
  changeFn(id: any) {
    this.selectedValueId = id;
    console.log(id);
  }

  enroll() {
    console.log(this.courseId);
    console.log(this.selectedValueId);

    this._studentService
      .registerCourseToStudent({
        courseId: this.courseId,
        instructorId: this.selectedValueId,
      })
      .subscribe({
        next: () => {
          console.log('hia');
        },
        error: (err) => {
          console.log(err);
        },
      });
  }
  displayColumns: Column[] = [];

  displayMaterial = [
    new Column({
      key: 'url',
      title: 'URL',
    }),
  ];
}
