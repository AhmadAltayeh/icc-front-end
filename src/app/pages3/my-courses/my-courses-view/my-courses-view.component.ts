import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  UntypedFormBuilder,
  UntypedFormGroup,
} from '@angular/forms';
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
  review: any = 5;
  s: string[] = [];
  constructor(
    private _fb: FormBuilder,
    public _studentService: StudentService,
    private _activatedRoute: ActivatedRoute,
    private fb: UntypedFormBuilder
  ) {}

  form!: UntypedFormGroup;
  res: any;
  submitForm(): void {
    // if (this.form.valid) {
    //   this._studentService.login(this.form.value).subscribe({
    //     next: (res) => {
    //       console.log(res);
    //       let x = res.roleGroup.toLowerCase();
    //       this._router.navigate([x]);
    //     },
    //   });
    // } else {
    //   Object.values(this.form.controls).forEach((control) => {
    //     if (control.invalid) {
    //       this.form.markAsDirty();
    //       this.form.updateValueAndValidity({ onlySelf: true });
    //     }
    //   });
    // }
  }
  onClick() {
    const { comment } = this.form.value;
    let revData = {
      rating: this.review,
      comment: comment,
      instructorId: this.selectedValueId,
      courseId: this.courseId,
    };
    console.log(revData);
    this._studentService.studentPostReview(revData).subscribe();
  }
  ngOnInit(): void {
    this.form = this.fb.group({
      comment: [null, [Validators.required]],
    });
    this.getCourse();
  }
  a: PaginationQuery = new PaginationQuery(0, 50);
  instructorReviews: any;
  getCourse() {
    this.courseId = Number(this._activatedRoute.snapshot.paramMap.get('id'));
    this._studentService
      .getOneCourseInstructor(this.courseId)
      .subscribe((json) => {
        this.courseData = json.data;
        console.log(this.courseData);
        this.selectedValueId = this.courseData.instructor.id;
        this.getReviews(this.selectedValueId);
      });
  }
  getReviews(id: any) {
    // const t = { courseId: this.courseId, instructorId: this.selectedValueId };
    this.a.addParams('courseId', this.courseId);
    console.log(id);

    this.a.addParams('instructorId', id);

    this._studentService.getCourseReview(this.a).subscribe((a) => {
      this.instructorReviews = a;
      console.log(a);
    });
  }
  changeFn(id: any) {
    this.selectedValueId = id;
    console.log(id);
  }

  displayColumns: Column[] = [];

  displayMaterial = [
    new Column({
      key: 'url',
      title: 'URL',
    }),
  ];
}
