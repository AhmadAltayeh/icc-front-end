import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReviewsListComponent } from './reviews-list.component';
import { RouterModule, Routes } from "@angular/router";
import { TableModule } from "../../../partials/table/table.module";
import { SearchFilterModule } from "../../../partials/search-filter/search-filter.module";
import { NzDrawerModule } from "ng-zorro-antd/drawer";
import { NzButtonModule } from "ng-zorro-antd/button";
import { ReviewsViewModule } from "../reviews-view/reviews-view.module";
import { NzIconModule } from 'ng-zorro-antd/icon';


const routes: Routes = [
  {
    path: '', component: ReviewsListComponent
  }
];

@NgModule({
  declarations: [ReviewsListComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    TableModule,
    SearchFilterModule,
    NzDrawerModule,
    NzButtonModule,
    ReviewsViewModule,
    NzIconModule
  ]
})
export class ReviewsListModule {
}
