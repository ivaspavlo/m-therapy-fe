import { NgModule, inject } from '@angular/core';
import { Route, Router, RouterModule } from '@angular/router';
import { CORE_ROUTE_NAMES } from '@app/core/constants';
import { catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';

import { ProductService } from '@app/core/services';
import { ProductComponent } from './product.component';
import { IBookingSlot, IResponse } from '@app/interfaces';


const productRoutes: Route[] = [
  {
    path: CORE_ROUTE_NAMES.BLANK,
    component: ProductComponent,
    children: [
      {
        path: '',
        component: ProductComponent,
        resolve: {
          data: () => {
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
  }
];

@NgModule({
  imports: [RouterModule.forChild(productRoutes)]
})
export class ProductRoutingModule { }
