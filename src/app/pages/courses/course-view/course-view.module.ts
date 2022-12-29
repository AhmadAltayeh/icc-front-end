import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CourseViewComponent} from './course-view.component';
import {NzFormModule} from "ng-zorro-antd/form";
import {NzInputModule} from "ng-zorro-antd/input";
import {NzSelectModule} from "ng-zorro-antd/select";
import {NzDatePickerModule} from "ng-zorro-antd/date-picker";
import {NzDrawerModule} from "ng-zorro-antd/drawer";
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [CourseViewComponent],
  exports: [
    CourseViewComponent
  ],
  imports: [
    CommonModule,
    NzFormModule,
    NzInputModule,
    NzSelectModule,
    NzDatePickerModule,
    NzDrawerModule,
    ReactiveFormsModule
  ]
})
export class CourseViewModule {
}
