import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AdminViewComponent} from './admin-view.component';
import {NzFormModule} from "ng-zorro-antd/form";
import {NzInputModule} from "ng-zorro-antd/input";
import {NzSelectModule} from "ng-zorro-antd/select";
import {NzDatePickerModule} from "ng-zorro-antd/date-picker";
import {NzDrawerModule} from "ng-zorro-antd/drawer";
import {ReactiveFormsModule} from "@angular/forms";
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzButtonModule } from 'ng-zorro-antd/button';


@NgModule({
  declarations: [AdminViewComponent],
  exports: [
    AdminViewComponent
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
    NzButtonModule
  ]
})
export class AdminViewModule {
}
