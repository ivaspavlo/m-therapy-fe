import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AngularMyDatePickerModule } from 'angular-mydatepicker';
import { SharedModule } from '@app/shared/shared.module';
import { FormErrorModule } from '../form-error/form-error.module';
import { DatePickerContainerComponent } from './container/date-picker-container.component';


@NgModule({
  declarations: [
    DatePickerContainerComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    AngularMyDatePickerModule,
    FormErrorModule
  ],
  exports: [
    DatePickerContainerComponent
  ]
})
export class DatePickerModule { }
