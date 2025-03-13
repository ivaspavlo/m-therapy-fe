import { NgModule, inject } from '@angular/core';
import { Route, Router, RouterModule } from '@angular/router';
import { CORE_ROUTE_NAMES } from '@app/core/constants';
import { catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';

import { BookingApiService, BookingManagementService } from '@app/core/services';
import { IBookingSlot, IResponse } from '@app/interfaces';
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
        data: { animationState: 'One' },
        resolve: {
          product: () => {
            const router = inject(Router);
            const managementService = inject(BookingManagementService);
            const apiService = inject(BookingApiService);
    
            const product = managementService.currentProduct;
            if (!product) {
              router.navigateByUrl(CORE_ROUTE_NAMES.HOME);
              return;
            }
    
            return apiService.getBookingSlots().pipe(
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
