import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { COMPONENTS } from './components';
import { ProductRoutingModule } from './product-routing.module';

@NgModule({
  declarations: [
    ...COMPONENTS
  ],
  imports: [
    CommonModule,
    ProductRoutingModule
  ]
})
export class ProductModule { }
