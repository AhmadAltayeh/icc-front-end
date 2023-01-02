import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseViewComponent } from './course-view.component';
import { NzFormModule } from "ng-zorro-antd/form";
import { NzInputModule } from "ng-zorro-antd/input";
import { NzSelectModule } from "ng-zorro-antd/select";
import { NzDatePickerModule } from "ng-zorro-antd/date-picker";
import { NzDrawerModule } from "ng-zorro-antd/drawer";
import { ReactiveFormsModule } from "@angular/forms";
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzTimePickerModule } from 'ng-zorro-antd/time-picker';
import { FormsModule } from '@angular/forms';
import { TableModule } from "../../../partials/table/table.module";
import { NzButtonModule } from 'ng-zorro-antd/button';
@NgModule({
    declarations: [CourseViewComponent],
    exports: [
        CourseViewComponent
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
        NzTimePickerModule,
        FormsModule,
        TableModule,
        NzButtonModule
    ]
})
export class CourseViewModule {
}
