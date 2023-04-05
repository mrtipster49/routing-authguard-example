import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RouteGuard } from './guards/route-guard';

const routes: Routes = [
  {
    path: '', // It represents /
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: '',
    canActivate: [ RouteGuard ],
    canActivateChild: [ RouteGuard ],
    children: [
      {
        path: 'login',
        loadChildren: () => import('./pages/login/login.module').then((m) => m.LoginModule)
      },
      {
        path: 'home',
        loadChildren: () => import('./pages/home/home.module').then((m) => m.HomeModule)
      },
      {
        path: 'todo',
        loadChildren: () => import('./pages/todo/todo-routing.module').then((m) => m.TodoRoutingModule)
      }
    ]
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes, {
    useHash: true
  }) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {
}
