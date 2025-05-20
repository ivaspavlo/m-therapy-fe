import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@app/shared/shared.module';

import { CoreTranslationModule } from '@app/core/core-translation.module';
import { UserPageComponent } from './user-page.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { UserBookingsComponent } from './components/user-bookings/user-bookings.component';
import { UserRoutingModule } from './user.routing-module';

@NgModule({
  declarations: [
    UserPageComponent,
    UserProfileComponent,
    UserBookingsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    UserRoutingModule,
    CoreTranslationModule.forChild(),
  ]
})
export class UserModule { }
