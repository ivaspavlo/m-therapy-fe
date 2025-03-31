import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';

import { BookingPaymentComponent, BookingSelectComponent } from './components';
import { BookingPageComponent } from './booking-page.component';
import { BOOKING_ROUTE_NAMES } from './constants';

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
        component: BookingSelectComponent,
      }, {
        path: BOOKING_ROUTE_NAMES.BOOKING_PAYMENT,
        component: BookingPaymentComponent,
        data: { animationState: 'One' }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(bookingRoutes)]
})
export class BookingRoutingModule { }
