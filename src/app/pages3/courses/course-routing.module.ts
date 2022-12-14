import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      //{path: '', redirectTo: 'list', pathMatch: "full"},
      {
        path: '',
        loadChildren: () =>
          import('./courses-list/courses-list.module').then(
            (m) => m.CoursesListModule
          ),
        //data: {breadcrumb: 'List'}
      },
      {
        path: 'view-course/:id',
        loadChildren: () =>
          import('./course-view/course-view.module').then(
            (m) => m.CourseViewModule
          ),
        //data: {breadcrumb: 'List'}
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoursesRoutingModule {}
