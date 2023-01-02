import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {Layout2Component} from "./layout2.component";

const routes: Routes = [
  {
    path: '',
    component: Layout2Component,
    children: [
      {path: 'instructors', pathMatch: 'full', redirectTo: 'instructor/my-courses'},
      {
        path: 'my-courses',
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
