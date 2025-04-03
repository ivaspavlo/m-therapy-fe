import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { DatePickerModule, DialogModule } from '@app/modules/ui';
import { CoreTranslationModule } from '@app/core/core-translation.module';

import { SharedModule } from '@app/shared/shared.module';
import { BookingPaymentComponent, BookingSelectComponent } from './components';
import { BookingPageComponent } from './booking-page.component';
import { BookingRoutingModule } from './booking-routing.module';
import { CartComponent } from './components/cart/cart.component';

@NgModule({
  declarations: [
    BookingPaymentComponent,
    BookingSelectComponent,
    BookingPageComponent,
    CartComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    BookingRoutingModule,
    DatePickerModule,
    SharedModule,
    CoreTranslationModule.forChild(),
    DialogModule
  ]
})
export class BookingModule { }
