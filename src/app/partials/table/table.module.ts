import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TableComponent} from './table.component';
import {NzFormModule} from "ng-zorro-antd/form";
import {NzRadioModule} from "ng-zorro-antd/radio";
import {NzSwitchModule} from "ng-zorro-antd/switch";
import {NzTableModule} from "ng-zorro-antd/table";
import {NzDividerModule} from "ng-zorro-antd/divider";
import {NzDrawerModule} from "ng-zorro-antd/drawer";
import { AdminViewModule } from 'src/app/pages/admins/admin-view/admin-view.module';


@NgModule({
  declarations: [
    TableComponent
  ],
  exports: [
    TableComponent
  ],
  imports: [
    CommonModule,
    NzFormModule,
    NzRadioModule,
    NzSwitchModule,
    NzTableModule,
    NzDividerModule,
    NzDrawerModule,
    AdminViewModule
  ]
})
export class TableModule {
}
