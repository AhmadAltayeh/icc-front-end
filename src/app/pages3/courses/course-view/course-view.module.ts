import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseViewComponent } from './course-view.component';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import {
  NzSelectModule,
  NzSelectSearchComponent,
  NzSelectSizeType,
} from 'ng-zorro-antd/select';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { ReactiveFormsModule } from '@angular/forms';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzTimePickerModule } from 'ng-zorro-antd/time-picker';
import { FormsModule } from '@angular/forms';
import { TableModule } from '../../../partials/table/table.module';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzTableModule } from 'ng-zorro-antd/table';
import { RouterModule, Routes } from '@angular/router';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzRateModule } from 'ng-zorro-antd/rate';
const routes: Routes = [
  {
    path: 'view-course/:id',
    component: CourseViewComponent,
  },
];
@NgModule({
  declarations: [CourseViewComponent],
  exports: [CourseViewComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NzFormModule,
    NzInputModule,
    NzSelectModule,
    NzDatePickerModule,
    NzRateModule,
    NzDrawerModule,
    ReactiveFormsModule,
    NzTabsModule,
    NzTimePickerModule,
    FormsModule,
    TableModule,
    NzButtonModule,
    NzTableModule,
    NzCardModule,
  ],
})
export class CourseViewModule {}
