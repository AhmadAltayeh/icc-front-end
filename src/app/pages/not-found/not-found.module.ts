import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NotFoundComponent} from "./not-found.component";
import {RouterLinkWithHref, RouterModule, Routes} from "@angular/router";

const routes: Routes = [
  {path: '', component: NotFoundComponent}
];

@NgModule({
  declarations: [NotFoundComponent],
  imports: [
    CommonModule,
    RouterLinkWithHref,
    RouterModule.forChild(routes)
  ]
})
export class NotFoundModule {
}
