import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AppGuard} from "./core/guards";
import {NotFoundComponent} from "./pages/not-found/not-found.component";
import { Layout2Component } from './layout2/layout2.component'; 
import { Layout3Component } from './layout3/layout3.component'; 
const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./pages/auth/auth.module').then((m) => m.AuthModule)
  },
  {
    path: '',
    canActivate: [AppGuard],
    canActivateChild: [AppGuard],
    loadChildren: () => import('./layout/layout.module').then(m => m.LayoutModule)
  },
  {
    path:'instructors',
    canActivate: [AppGuard],
    canActivateChild: [AppGuard],
    loadChildren: () => import('./layout2/layout2.module').then(m=>m.Layout2Module)

  },
  {
    path:'students',
    canActivate: [AppGuard],
    canActivateChild: [AppGuard],
    loadChildren: () => import('./layout3/layout3.module').then(m=>m.Layout3Module)

  },
  {path: '404', loadChildren: () => import('./pages/not-found/not-found.module').then(m => m.NotFoundModule)},
  {path: '**', loadChildren: () => import('./pages/not-found/not-found.module').then(m => m.NotFoundModule)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
