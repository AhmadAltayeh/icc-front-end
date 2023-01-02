import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {Layout3Component} from "./layout3.component";

const routes: Routes = [
  {
    path: '',
    component: Layout3Component,
    children: [
      {path: 'students', pathMatch: 'full', redirectTo: 'my-courses'},
      {
        path: 'my-courses',
        loadChildren: () => import('../pages/courses/courses.module').then(m => m.CoursesModule),
      },
      {
        path: 'courses',
        loadChildren: () => import('../pages/courses/courses.module').then(m => m.CoursesModule),
      },
      {
        path: 'profile',
        loadChildren: () => import('../pages/profile/profile.module').then(m => m.ProfileModule),
      }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule {
}
