import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreTranslationModule } from '@app/core/core-translation.module';
import { COMPONENTS } from './components';


@NgModule({
  declarations: [
    ...COMPONENTS
  ],
  imports: [
    CommonModule,
    CoreTranslationModule.forChild()
  ],
  exports: [
    ...COMPONENTS
  ]
})
export class SharedModule { }
