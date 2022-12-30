import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProfileComponent} from "./profile.component";
import {RouterLinkWithHref, RouterModule, Routes} from "@angular/router";

const routes: Routes = [
  {path: '', component: ProfileComponent}
];

@NgModule({
  declarations: [ProfileComponent],
  imports: [
    CommonModule,
    RouterLinkWithHref,
    RouterModule.forChild(routes)
  ]
})
export class ProfileModule {
}
