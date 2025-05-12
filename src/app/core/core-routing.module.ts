import { inject, NgModule } from '@angular/core';
import { CanActivateFn, Route, RouterModule } from '@angular/router';
import { ACCESS_TOKEN, CORE_ROUTE_NAMES } from './constants';
import { LOCAL_STORAGE } from './providers';

export const AuthGuard: CanActivateFn = (): boolean => {
  const localStorage = inject(LOCAL_STORAGE) as Storage;
  const jwt = localStorage.get(ACCESS_TOKEN);
  
  return !!jwt;
}

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
    path: CORE_ROUTE_NAMES.USER,
    canActivate: [AuthGuard],
    data: { animationState: 'Two' },
    loadChildren: () => import('@app/modules/lazy/user/user.module').then(m => m.UserModule)
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
