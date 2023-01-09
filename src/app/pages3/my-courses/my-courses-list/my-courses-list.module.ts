import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyCoursesListComponent } from './my-courses-list.component';
import { RouterModule, Routes } from '@angular/router';
import { TableModule } from '../../../partials/table/table.module';
import { Card2Module } from 'src/app/partials/card2/card2.module';
import { SearchFilterModule } from '../../../partials/search-filter/search-filter.module';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { MyCoursesFormModule } from '../my-courses-form/my-courses-form.module';
import { MyCoursesViewModule } from '../my-courses-view/my-courses-view.module';
import { NzTabsModule } from 'ng-zorro-antd/tabs';

const routes: Routes = [
  {
    path: '',
    component: MyCoursesListComponent,
  },
];

@NgModule({
  declarations: [MyCoursesListComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    Card2Module,
    TableModule,
    SearchFilterModule,
    NzDrawerModule,
    NzButtonModule,
    MyCoursesFormModule,
    MyCoursesViewModule,
    NzTabsModule,
  ],
})
export class MyCoursesListModule {}
