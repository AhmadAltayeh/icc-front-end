import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LayoutComponent} from "./layout.component";

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {path: '', pathMatch: 'full', redirectTo: 'admins'},
      {
        path: 'admins',
        loadChildren: () => import('../pages/admins/admins.module').then(m => m.AdminsModule),
      },
      {
        path: 'instructors',
        loadChildren: () => import('../pages/instructors/instructors.module').then(m => m.InstructorsModule),
      },
      {
        path: 'courses',
        loadChildren: () => import('../pages/courses/courses.module').then(m => m.CoursesModule),
      },
      {
        path: 'students',
        loadChildren: () => import('../pages/students/students.module').then(m => m.StudentsModule),
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
