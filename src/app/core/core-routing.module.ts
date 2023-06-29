import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { CORE_ROUTE_NAMES } from './constants';


const coreRouts: Route[] = [
  {
    path: CORE_ROUTE_NAMES.BLANK,
    pathMatch: 'full',
    redirectTo: CORE_ROUTE_NAMES.HOME
  }, {
    path: CORE_ROUTE_NAMES.HOME,
    data: { animationState: 'One' },
    loadChildren: () => import('@app/modules/lazy/main/main.module').then(m => m.MainModule)
  }, {
    path: CORE_ROUTE_NAMES.AUTH,
    data: { animationState: 'Two' },
    loadChildren: () => import('@app/modules/lazy/auth/auth.module').then(m => m.AuthModule)
  }, {
    path: CORE_ROUTE_NAMES.OTHER,
    pathMatch: 'full',
    redirectTo: CORE_ROUTE_NAMES.HOME
  }
];

@NgModule({
  imports: [RouterModule.forRoot(coreRouts)],
  exports: [RouterModule]
})
export class CoreRoutingModule { }
