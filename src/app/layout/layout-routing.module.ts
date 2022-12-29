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
        data: {breadcrumb: 'Admins'},
      },
      {
        path: 'instructors',
        loadChildren: () => import('../pages/instructors/instructors.module').then(m => m.InstructorsModule),
        data: {breadcrumb: 'Instructors'},
      },
      {
        path: 'courses',
        loadChildren: () => import('../pages/courses/courses.module').then(m => m.CoursesModule),
        data: {breadcrumb: 'Courses'},
      },
      {
        path: 'students',
        loadChildren: () => import('../pages/students/students.module').then(m => m.StudentsModule),
        data: {breadcrumb: 'Students'},
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
