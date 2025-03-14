import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { CORE_ROUTE_NAMES } from './constants';


const coreRouts: Route[] = [
  {
    path: '',
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
    path: CORE_ROUTE_NAMES.ADMIN,
    data: { animationState: 'Two' },
    loadChildren: () => import('@app/modules/lazy/admin/admin.module').then(m => m.AdminModule)
  }, {
    path: CORE_ROUTE_NAMES.BOOKING,
    data: { animationState: 'Two' },
    loadChildren: () => import('@app/modules/lazy/booking/booking.module').then(m => m.BookingModule)
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
