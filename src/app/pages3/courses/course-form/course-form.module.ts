import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CourseFormComponent} from './course-form.component';
import {NzFormModule} from "ng-zorro-antd/form";
import {NzInputModule} from "ng-zorro-antd/input";
import {NzSelectModule} from "ng-zorro-antd/select";
import {NzDatePickerModule} from "ng-zorro-antd/date-picker";
import {NzDrawerModule} from "ng-zorro-antd/drawer";
import {ReactiveFormsModule} from "@angular/forms";
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { TableModule } from "../../../partials/table/table.module";

@NgModule({
    declarations: [CourseFormComponent],
    exports: [
        CourseFormComponent
    ],
    imports: [
        CommonModule,
        NzFormModule,
        NzInputModule,
        NzSelectModule,
        NzDatePickerModule,
        NzDrawerModule,
        ReactiveFormsModule,
        NzDropDownModule, NzTabsModule,
        TableModule
    ]
})
export class CourseFormModule {
}
