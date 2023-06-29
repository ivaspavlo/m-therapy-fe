import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreTranslationModule } from '@core/core-translation.module';

import { COMPONENTS } from './components';
import { PIPES } from './pipes';


@NgModule({
  declarations: [
    ...COMPONENTS,
    ...PIPES
  ],
  imports: [
    CommonModule,
    CoreTranslationModule.forChild()
  ],
  exports: [
    ...COMPONENTS
  ]
})
export class FormErrorModule { }
