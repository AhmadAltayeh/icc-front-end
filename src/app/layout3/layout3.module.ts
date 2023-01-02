import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Layout3Component} from './layout3.component';
import {NzLayoutModule} from "ng-zorro-antd/layout";
import {NzMenuModule} from "ng-zorro-antd/menu";
import {RouterLinkWithHref, RouterOutlet} from "@angular/router";
import {NzIconModule} from "ng-zorro-antd/icon";
import {LayoutRoutingModule} from "./layout3-routing.module";
import {NzBreadCrumbModule} from "ng-zorro-antd/breadcrumb";
import {NzDividerModule} from "ng-zorro-antd/divider";
import {NzButtonModule} from "ng-zorro-antd/button";
import {NzDropDownModule} from "ng-zorro-antd/dropdown";
import {MatIconModule} from '@angular/material/icon';



@NgModule({
  declarations: [
    Layout3Component,
  ],
  imports: [
    CommonModule,
    NzLayoutModule,
    NzMenuModule,
    RouterLinkWithHref,
    NzIconModule,
    RouterOutlet,
    LayoutRoutingModule,
    NzBreadCrumbModule,
    NzDividerModule,
    NzButtonModule,
    NzDropDownModule,
    MatIconModule
  ]
})
export class Layout3Module {
}
