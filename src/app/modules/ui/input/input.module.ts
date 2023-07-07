import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { CoreTranslationModule } from '@app/core/core-translation.module';
import { SharedModule } from '@app/shared/shared.module';
import { COMPONENTS } from './components';
import { FormErrorModule } from '../form-error/form-error.module';


@NgModule({
  declarations: [
    ...COMPONENTS
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormErrorModule,
    SharedModule,
    CoreTranslationModule.forChild()
  ],
  exports: [
    ...COMPONENTS
  ]
})
export class InputModule { }
