import { NgModule, inject } from '@angular/core';
import { ActivatedRouteSnapshot, Route, Router, RouterModule } from '@angular/router';
import { CORE_ROUTE_NAMES } from '@app/core/constants';
import { catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';

import { BookingApiService } from '@app/core/services';
import { IBookingSlot, IPreBooking, IResponse } from '@app/interfaces';
import { ProductComponent } from './product.component';
import { BookingConfirmComponent } from './components';


export enum PRODUCT_ROUTE_NAMES {
  CONFIRM_BOOKING = 'confirm-booking/:token'
}

const productRoutes: Route[] = [
  {
    path: CORE_ROUTE_NAMES.BLANK,
    component: ProductComponent,
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
    path: PRODUCT_ROUTE_NAMES.CONFIRM_BOOKING,
    component: BookingConfirmComponent,
    resolve: {
      preBooking: (route: ActivatedRouteSnapshot) => {
        const router = inject(Router);

        return inject(BookingApiService).getPreBooking(route.paramMap.get('token')!).pipe(
          catchError(() => of(null)),
          map((res: IResponse<IPreBooking> | null) => {
            debugger
            if (res === null || !res?.success) {
              router.navigateByUrl(CORE_ROUTE_NAMES.HOME);
              return;
            }
            return res.data;
          })
        );
      }
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(productRoutes)]
})
export class ProductRoutingModule { }
