import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      //{path: '', redirectTo: 'list', pathMatch: "full"},
      {
        path: '',
        loadChildren: () => import('./instructors-list/instructors-list.module').then(m => m.InstructorsListModule)
        //data: {breadcrumb: 'List'}
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InstructorsRoutingModule {
}
