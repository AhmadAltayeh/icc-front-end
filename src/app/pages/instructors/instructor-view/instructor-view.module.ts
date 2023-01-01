import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InstructorViewComponent } from './instructor-view.component';
import { NzFormModule } from "ng-zorro-antd/form";
import { NzInputModule } from "ng-zorro-antd/input";
import { NzSelectModule } from "ng-zorro-antd/select";
import { NzDatePickerModule } from "ng-zorro-antd/date-picker";
import { NzDrawerModule } from "ng-zorro-antd/drawer";
import { ReactiveFormsModule } from "@angular/forms";
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { TableModule } from 'src/app/partials/table/table.module'; 

@NgModule({
  declarations: [InstructorViewComponent],
  exports: [
    InstructorViewComponent
  ],
  imports: [
    CommonModule,
    NzFormModule,
    NzInputModule,
    NzSelectModule,
    NzDatePickerModule,
    NzDrawerModule,
    ReactiveFormsModule,
    NzTabsModule,
    NzUploadModule,
    NzRadioModule,
    NzButtonModule,
    TableModule
  ]
})
export class InstructorViewModule {
}
