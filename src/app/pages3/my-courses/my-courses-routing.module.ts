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
          import('./my-courses-list/my-courses-list.module').then(
            (m) => m.MyCoursesListModule
          ),
        //data: {breadcrumb: 'List'}
      },
      {
        path: 'view-course/:id',
        loadChildren: () =>
          import('./my-courses-view/my-courses-view.module').then(
            (m) => m.MyCoursesViewModule
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
export class MyCoursesRoutingModule {}
