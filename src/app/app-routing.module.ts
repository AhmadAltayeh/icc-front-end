import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AppGuard} from "./core/guards";
const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/welcome/welcome.module').then((m) => m.WelcomeModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/signin/signin.module').then((m) => m.SigninModule)
  },
  {
    path: 'auth',
    loadChildren: () => import('./pages/auth/auth.module').then((m) => m.AuthModule)
  },
  {
    path: 'admins',
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
