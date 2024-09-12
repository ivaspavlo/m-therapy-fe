import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { DatePickerModule, DialogModule } from '@app/modules/ui';
import { CoreTranslationModule } from '@app/core/core-translation.module';

import { SharedModule } from '@app/shared/shared.module';
import { COMPONENTS } from './components';
import { ProductRoutingModule } from './product-routing.module';

@NgModule({
  declarations: [
    ...COMPONENTS
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ProductRoutingModule,
    DatePickerModule,
    SharedModule,
    CoreTranslationModule.forChild(),
    DialogModule
  ]
})
export class ProductModule { }
