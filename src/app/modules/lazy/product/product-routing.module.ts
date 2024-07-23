import { NgModule, inject } from '@angular/core';
import { Route, Router, RouterModule } from '@angular/router';
import { CORE_ROUTE_NAMES } from '@app/core/constants';
import { catchError, map, tap } from 'rxjs/operators';
import { of } from 'rxjs';

import { ProductService } from '@app/core/services';
import { ProductComponent } from './product.component';


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
              tap((res: null | any) => {
                if(res === null) {
                  router.navigateByUrl(CORE_ROUTE_NAMES.HOME);
                  return;
                }
              }),
              map((res: any) => {
                return {
                  product,
                  slots: res
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
