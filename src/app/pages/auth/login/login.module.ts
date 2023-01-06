import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {LoginComponent} from "./login.component";
import {RouterLinkWithHref, RouterOutlet} from "@angular/router";
import { AuthRoutingModule } from '../auth-routing.module';
const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },

];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class LoginModule {
}
