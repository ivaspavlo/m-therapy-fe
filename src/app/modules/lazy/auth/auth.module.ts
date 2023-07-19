import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@app/shared/shared.module';
import { CoreTranslationModule } from '@app/core/core-translation.module';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthPageComponent } from './auth-page.component';
import { COMPONENTS } from './components';
import { DatePickerModule, DialogModule } from '@app/modules/ui';


@NgModule({
  declarations: [
    AuthPageComponent,
    ...COMPONENTS
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
