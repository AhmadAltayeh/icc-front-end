import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginComponent} from './login/login.component';
import {AuthRoutingModule} from "./auth-routing.module";
import {NzFormModule} from "ng-zorro-antd/form";
import {NzInputModule} from "ng-zorro-antd/input";
import {NzButtonModule} from "ng-zorro-antd/button";
import{ReactiveFormsModule} from "@angular/forms"

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    NzFormModule,
    ReactiveFormsModule,
    NzInputModule,
    NzButtonModule
  ]
})
export class AuthModule {
}
