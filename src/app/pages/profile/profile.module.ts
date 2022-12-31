import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProfileComponent} from "./profile.component";
import {RouterLinkWithHref, RouterModule, Routes} from "@angular/router";
import {NzFormModule} from "ng-zorro-antd/form";
import {NzInputModule} from "ng-zorro-antd/input";
import {NzSelectModule} from "ng-zorro-antd/select";
import {NzDatePickerModule} from "ng-zorro-antd/date-picker";
import {NzDrawerModule} from "ng-zorro-antd/drawer";
import {ReactiveFormsModule} from "@angular/forms";

const routes: Routes = [
  {path: '', component: ProfileComponent}
];

@NgModule({
  declarations: [ProfileComponent],
  imports: [
    CommonModule,
    RouterLinkWithHref,
    RouterModule.forChild(routes),
    ReactiveFormsModule,NzDrawerModule,NzDatePickerModule,NzSelectModule,NzInputModule,NzFormModule
  ]
})
export class ProfileModule {

}
