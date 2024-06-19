import { NgModule, inject } from '@angular/core';
import { ActivatedRouteSnapshot, Route, RouterModule } from '@angular/router';
import { CORE_ROUTE_NAMES } from '@app/core/constants';

import { ProductService } from '@app/core/services';
import { ProductComponent } from './product.component';


const productRoutes: Route[] = [
  {
    path: CORE_ROUTE_NAMES.BLANK,
    children: [
      {
        path: ':id',
        component: ProductComponent,
        resolve: {
          data: (route: ActivatedRouteSnapshot) => {
            return inject(ProductService).getProduct(route.paramMap.get('id')!);
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
