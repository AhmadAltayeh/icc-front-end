import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AdminsListComponent} from './admins-list.component';
import {RouterModule, Routes} from "@angular/router";
import {TableModule} from "../../../partials/table/table.module";
import {SearchFilterModule} from "../../../partials/search-filter/search-filter.module";
import {NzDrawerModule} from "ng-zorro-antd/drawer";
import {NzButtonModule} from "ng-zorro-antd/button";
import {AdminFormModule} from "../admin-form/admin-form.module";
import {AdminViewModule} from "../admin-view/admin-view.module";
import {MatTabsModule} from '@angular/material/tabs';


const routes: Routes = [
  {
    path: '', component: AdminsListComponent
  }
];

@NgModule({
  declarations: [AdminsListComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    TableModule,
    SearchFilterModule,
    NzDrawerModule,   
    NzButtonModule,
    AdminFormModule,
    AdminViewModule,
    MatTabsModule
  ]
})
export class AdminsListModule {
}
