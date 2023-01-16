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
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';


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
        NzButtonModule,
        NzIconModule,
        NzTableModule,
        NzModalModule,
        NzDropDownModule
    ]
})
export class CourseViewModule {
}
