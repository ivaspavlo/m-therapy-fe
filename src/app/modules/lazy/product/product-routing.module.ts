import { NgModule, inject } from '@angular/core';
import { ActivatedRouteSnapshot, Route, Router, RouterModule } from '@angular/router';
import { CORE_ROUTE_NAMES } from '@app/core/constants';
import { catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';

import { ProductService } from '@app/core/services';
import { ProductComponent } from './product.component';
import { IBookingSlot, IResponse } from '@app/interfaces';
import { ConfirmBookingComponent } from '../auth/components/confirm-booking/confirm-booking.component';


export enum PRODUCT_ROUTE_NAMES {
  CONFIRM_BOOKING = 'confirm-booking:token'
}

const productRoutes: Route[] = [
  {
    path: CORE_ROUTE_NAMES.BLANK,
    component: ProductComponent,
    children: [
      {
        path: '',
        component: ProductComponent,
        resolve: {
          product: () => {
            const router = inject(Router);
            const productService = inject(ProductService);

            const product = router.getCurrentNavigation()?.extras?.state;
            if (!product) {
              router.navigateByUrl(CORE_ROUTE_NAMES.HOME);
              return;
            }

            return productService.getBookingSlots().pipe(
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
      }
    ]
  }, {
    path: PRODUCT_ROUTE_NAMES.CONFIRM_BOOKING,
    component: ConfirmBookingComponent,
    resolve: {
      preBooking: (route: ActivatedRouteSnapshot) => {
        return inject(ProductService).getPreBooking(route.paramMap.get('token')!).pipe(
          catchError(() => of(null))
        );
      }
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(productRoutes)]
})
export class ProductRoutingModule { }
