import { inject, NgModule } from '@angular/core';
import { CanActivateFn, Route, Router, RouterModule, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

import { CORE_ROUTE_NAMES } from '@app/core/constants';
import { BookingManagementService } from '@app/core/services';
import { BookingPaymentComponent, BookingSelectComponent } from './components';
import { BookingPageComponent } from './booking-page.component';
import { BOOKING_ROUTE_NAMES } from './constants';
import { CartComponent } from './components/cart/cart.component';

const BookingGuard: CanActivateFn = (): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree=> {
  const bookingManagementService = inject(BookingManagementService);

  return bookingManagementService.getTotals()
    ? true
    : inject(Router).createUrlTree([CORE_ROUTE_NAMES.HOME]);
};

const bookingRoutes: Route[] = [
  {
    path: '',
    component: BookingPageComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: BOOKING_ROUTE_NAMES.BOOKING_SELECT
      }, {
        path: BOOKING_ROUTE_NAMES.BOOKING_SELECT,
        canActivate: [BookingGuard],
        component: BookingSelectComponent
      }, {
        path: BOOKING_ROUTE_NAMES.BOOKING_PAYMENT,
        component: BookingPaymentComponent,
        canActivate: [BookingGuard],
        data: { animationState: 'One' }
      }, {
        path: BOOKING_ROUTE_NAMES.CART,
        component: CartComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(bookingRoutes)]
})
export class BookingRoutingModule { }
