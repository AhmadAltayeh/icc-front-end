import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InstructorsListComponent } from './instructors-list.component';
import { RouterModule, Routes } from "@angular/router";
import { TableModule } from "../../../partials/table/table.module";
import { SearchFilterModule } from "../../../partials/search-filter/search-filter.module";
import { NzDrawerModule } from "ng-zorro-antd/drawer";
import { NzButtonModule } from "ng-zorro-antd/button";
import { InstructorFormModule } from "../instructor-form/instructor-form.module";
import { InstructorViewModule } from "../instructor-view/instructor-view.module";
import { NzIconModule } from 'ng-zorro-antd/icon';


const routes: Routes = [
  {
    path: '', component: InstructorsListComponent
  }
];

@NgModule({
  declarations: [InstructorsListComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    TableModule,
    SearchFilterModule,
    NzDrawerModule,
    NzButtonModule,
    InstructorFormModule,
    InstructorViewModule,
    NzIconModule
  ]
})
export class InstructorsListModule {
}
