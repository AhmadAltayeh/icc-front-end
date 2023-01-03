import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {Layout2Component} from "./layout2.component";

const routes: Routes = [
  {
    path: '',
    component: Layout2Component,
    children: [
      {path: '', pathMatch: 'full', redirectTo: 'instructors'},
      {
        path: 'instructors',
        loadChildren: () => import('../pages2/courses/courses.module').then(m => m.InstructorCoursesModule),
      },
      {
        path: 'profile',
        loadChildren: () => import('../pages2/profile/profile.module').then(m => m.ProfileModule),
      },
      {path: '404', loadChildren: () => import('../pages2/not-found/not-found.module').then(m => m.NotFoundModule)},
      {path: '**', loadChildren: () => import('../pages2/not-found/not-found.module').then(m => m.NotFoundModule)},
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule {
}
