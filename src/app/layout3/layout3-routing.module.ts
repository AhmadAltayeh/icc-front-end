import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {Layout3Component} from "./layout3.component";
import { CoursesModule } from '../pages3/courses/courses.module';
import { ProfileModule } from '../pages3/profile/profile.module';
const routes: Routes = [
  {
    path: '',
    component: Layout3Component,
    children: [
      {path: 'students', pathMatch: 'full', redirectTo: 'my-courses'},
      {
        path: 'my-courses',
        loadChildren: () => import('../pages3/courses/courses.module').then(m => m.CoursesModule),
      },
      {
        path: 'courses',
        loadChildren: () => import('../pages3/courses/courses.module').then(m => m.CoursesModule),
      },
      {
        path: 'profile',
        loadChildren: () => import('../pages3/profile/profile.module').then(m => m.ProfileModule),
      },
      {
        path: '404', loadChildren: () => import('../pages3/not-found/not-found.module').then(m => m.NotFoundModule)
      },
      {
        path: '**', loadChildren: () => import('../pages3/not-found/not-found.module').then(m => m.NotFoundModule)
      },
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule3 {
}
