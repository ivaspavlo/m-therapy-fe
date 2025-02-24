import { NgModule, inject } from '@angular/core';
import { Route, Router, RouterModule } from '@angular/router';
import { CORE_ROUTE_NAMES } from '@app/core/constants';
import { catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';

import { BookingApiService } from '@app/core/services';
import { IBookingSlot, IResponse } from '@app/interfaces';
import { BookingPaymentComponent, BookingSelectComponent } from './components';
import { BookingPageComponent } from './booking-page.component';

export enum BOOKING_ROUTE_NAMES {
  ROOT = CORE_ROUTE_NAMES.BOOKING,
  BOOKING_SELECT = 'booking-select',
  BOOKING_PAYMENT = 'booking-payment'
}

const bookingRoutes: Route[] = [
  {
    path: CORE_ROUTE_NAMES.BLANK,
    component: BookingPageComponent,
    children: [
      {
        path: BOOKING_ROUTE_NAMES.BOOKING_SELECT,
        component: BookingSelectComponent,
        data: { animationState: 'One' },
        resolve: {
          product: () => {
            const router = inject(Router);
            const bookingService = inject(BookingApiService);
    
            const product = router.getCurrentNavigation()?.extras?.state;
            if (!product) {
              router.navigateByUrl(CORE_ROUTE_NAMES.HOME);
              return;
            }
    
            return bookingService.getBookingSlots().pipe(
              catchError(() => of(null)),
              map((res: IResponse<IBookingSlot[]> | null) => {
                if (res === null || !res?.success) {
                  router.navigateByUrl(CORE_ROUTE_NAMES.HOME);
                  return;
                }
                return {
                  product,
                  dates: res.data
                }
              })
            );
          }
        }
      }, {
        path: BOOKING_ROUTE_NAMES.BOOKING_PAYMENT,
        component: BookingPaymentComponent,
        data: { animationState: 'Two' }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(bookingRoutes)]
})
export class BookingRoutingModule { }
