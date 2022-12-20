import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SearchFilterComponent} from './search-filter.component';
import {NzInputModule} from "ng-zorro-antd/input";
import {NzButtonModule} from "ng-zorro-antd/button";
import {NzIconModule} from "ng-zorro-antd/icon";
import {FormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    SearchFilterComponent
  ],
  exports: [
    SearchFilterComponent
  ],
  imports: [
    CommonModule,
    NzInputModule,
    NzButtonModule,
    NzIconModule,
    FormsModule
  ]
})
export class SearchFilterModule {
}
