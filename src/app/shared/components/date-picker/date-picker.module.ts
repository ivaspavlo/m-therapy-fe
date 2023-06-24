import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AngularMyDatePickerModule } from 'angular-mydatepicker';

import { FirstErrorPipe } from './pipes/first-error.pipe';
import { DatePickerContainerComponent } from './container/date-picker-container.component';


@NgModule({
  declarations: [
    FirstErrorPipe,
    DatePickerContainerComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    AngularMyDatePickerModule
  ],
  exports: [
    DatePickerContainerComponent
  ]
})
export class DatePickerModule { }
