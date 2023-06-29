import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { CoreTranslationModule } from '@core/core-translation.module';

import { FormErrorModule } from '@app/modules/ui/form-error/form-error.module';

import { COMPONENTS } from './components';


@NgModule({
  declarations: [
    ...COMPONENTS
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormErrorModule,
    CoreTranslationModule.forChild()
  ],
  exports: [
    ...COMPONENTS
  ]
})
export class SelectModule { }
