import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoursesListComponent } from './courses-list.component';
import { RouterModule, Routes } from "@angular/router";
import { TableModule } from "../../../partials/table/table.module";
import { SearchFilterModule } from "../../../partials/search-filter/search-filter.module";
import { NzDrawerModule } from "ng-zorro-antd/drawer";
import { NzButtonModule } from "ng-zorro-antd/button";
import { CourseFormModule } from "../course-form/course-form.module";
import { CourseViewModule } from "../course-view/course-view.module";
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzIconModule } from 'ng-zorro-antd/icon';

const routes: Routes = [
  {
    path: '', component: CoursesListComponent
  }
];

@NgModule({
  declarations: [CoursesListComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    TableModule,
    SearchFilterModule,
    NzDrawerModule,
    NzButtonModule,
    CourseFormModule,
    CourseViewModule,
    NzTabsModule,
    NzIconModule
  ]
})
export class CoursesListModule {
}
