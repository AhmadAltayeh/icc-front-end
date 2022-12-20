import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LayoutComponent} from './layout.component';
import {NzLayoutModule} from "ng-zorro-antd/layout";
import {NzMenuModule} from "ng-zorro-antd/menu";
import {RouterLinkWithHref, RouterOutlet} from "@angular/router";
import {NzIconModule} from "ng-zorro-antd/icon";
import {LayoutRoutingModule} from "./layout-routing.module";
import {NzBreadCrumbModule} from "ng-zorro-antd/breadcrumb";
import {NzDividerModule} from "ng-zorro-antd/divider";
import {NzButtonModule} from "ng-zorro-antd/button";
import {NzDropDownModule} from "ng-zorro-antd/dropdown";


@NgModule({
  declarations: [
    LayoutComponent
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
    NzDropDownModule
  ]
})
export class LayoutModule {
}
