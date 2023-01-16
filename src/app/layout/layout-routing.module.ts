import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LayoutComponent} from "./layout.component";

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {path: '', pathMatch: 'full', redirectTo: 'stats'},
      {
        path: 'stats',
        loadChildren: () => import('../pages/stats/admin-stats.module').then(m => m.AdminStatsModule),
      },
      {
        path: 'admins/admins',
        loadChildren: () => import('../pages/admins/admins.module').then(m => m.AdminsModule),
      },
      {
        path: 'admins/instructors',
        loadChildren: () => import('../pages/instructors/instructors.module').then(m => m.InstructorsModule),
      },
      {
        path: 'admins/courses',
        loadChildren: () => import('../pages/courses/courses.module').then(m => m.CoursesModule),
      },
      {
        path: 'admins/students',
        loadChildren: () => import('../pages/students/students.module').then(m => m.StudentsModule),
      },
      {
        path: 'admins/profile',
        loadChildren: () => import('../pages/profile/profile.module').then(m => m.ProfileModule),
      },
      {
        path: 'admins/reviews',
        loadChildren: () => import('../pages/reviews/reviews.module').then(m => m.ReviewsModule),
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
