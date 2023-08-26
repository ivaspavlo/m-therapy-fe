import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '@app/shared/shared.module';
import { DatePickerContainerComponent } from './date-picker-container.component';


@NgModule({
  declarations: [
    DatePickerContainerComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule
  ],
  exports: [
    DatePickerContainerComponent
  ]
})
export class DatePickerModule { }
