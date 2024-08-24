import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@app/shared/shared.module';
import { CoreTranslationModule } from '@app/core/core-translation.module';
import { DatePickerModule, DialogModule } from '@app/modules/ui';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthPageComponent } from './auth-page.component';
import { COMPONENTS } from './components';
import { ConfirmBookingComponent } from './components/confirm-booking/confirm-booking.component';


@NgModule({
  declarations: [
    AuthPageComponent,
    ...COMPONENTS,
    ConfirmBookingComponent,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    DatePickerModule,
    DialogModule,
    CoreTranslationModule.forChild()
  ]
})
export class AuthModule { }
