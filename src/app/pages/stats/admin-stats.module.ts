import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLinkWithHref, RouterModule, Routes } from "@angular/router";
import { NzFormModule } from "ng-zorro-antd/form";
import { NzInputModule } from "ng-zorro-antd/input";
import { NzSelectModule } from "ng-zorro-antd/select";
import { NzDatePickerModule } from "ng-zorro-antd/date-picker";
import { NzDrawerModule } from "ng-zorro-antd/drawer";
import { ReactiveFormsModule } from "@angular/forms";
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { AdminStatsComponent } from './admin-stats.component';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzRateModule } from 'ng-zorro-antd/rate';
import { FormsModule } from '@angular/forms';
import { NgCircleProgressModule } from 'ng-circle-progress';


const routes: Routes = [
  { path: '', component: AdminStatsComponent }
];


@NgModule({
  declarations: [AdminStatsComponent],
  imports: [
    CommonModule,
    RouterLinkWithHref,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    NzDrawerModule,
    NzDatePickerModule,
    NzSelectModule,
    NzInputModule,
    NzFormModule,
    NzTabsModule,
    NzCardModule,
    NzRateModule,
    FormsModule,
    NgCircleProgressModule.forRoot({
      "radius": 60,
      "space": -10,
      "outerStrokeGradient": true,
      "outerStrokeWidth": 10,
      "outerStrokeColor": "#4882c2",
      "outerStrokeGradientStopColor": "#53a9ff",
      "innerStrokeColor": "#e7e8ea",
      "innerStrokeWidth": 10,
      "animateTitle": false,
      "animationDuration": 1000,
      "showUnits": true,
      "showBackground": false,
      "showSubtitle":false,
      "clockwise": true,
      "startFromZero": false,
      "lazy": true})
  ]
})
export class AdminStatsModule {

}
