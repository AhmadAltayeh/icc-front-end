import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StudentFormComponent} from './student-form.component';
import {NzFormModule} from "ng-zorro-antd/form";
import {NzInputModule} from "ng-zorro-antd/input";
import {NzSelectModule} from "ng-zorro-antd/select";
import {NzDatePickerModule} from "ng-zorro-antd/date-picker";
import {NzDrawerModule} from "ng-zorro-antd/drawer";
import {ReactiveFormsModule} from "@angular/forms";
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [StudentFormComponent],
  exports: [
    StudentFormComponent
  ],
  imports: [
    CommonModule,FormsModule,
    NzFormModule,
    NzInputModule,
    NzSelectModule,
    NzDatePickerModule,
    NzDrawerModule,
    ReactiveFormsModule,
    NzDropDownModule,
  ]
})
export class StudentFormModule {
}
