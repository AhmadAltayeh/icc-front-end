import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StudentsListComponent} from './students-list.component';
import {RouterModule, Routes} from "@angular/router";
import {TableModule} from "../../../partials/table/table.module";
import {SearchFilterModule} from "../../../partials/search-filter/search-filter.module";
import {NzDrawerModule} from "ng-zorro-antd/drawer";
import {NzButtonModule} from "ng-zorro-antd/button";
import {StudentFormModule} from "../student-form/student-form.module";
import {StudentViewModule} from "../student-view/student-view.module";
import {MatTabsModule} from '@angular/material/tabs';

const routes: Routes = [
  {
    path: '', component: StudentsListComponent
  }
];

@NgModule({
  declarations: [StudentsListComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    TableModule,
    SearchFilterModule,
    NzDrawerModule,   
    NzButtonModule,
    StudentFormModule,
    StudentViewModule,
    MatTabsModule
  ]
  ,exports:[
    StudentsListComponent
  ]
})
export class StudentsListModule {
}
