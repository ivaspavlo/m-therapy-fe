import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxSpinnerModule } from "ngx-spinner";
import { CoreTranslationModule } from '@app/core/core-translation.module';
import { COMPONENTS } from './components';
import { DIRECTIVES } from './directives';


@NgModule({
  declarations: [
    ...COMPONENTS,
    ...DIRECTIVES
  ],
  imports: [
    CommonModule,
    CoreTranslationModule.forChild(),
    NgxSpinnerModule.forRoot({ type: 'ball-scale-multiple' })
  ],
  exports: [
    ...COMPONENTS,
    ...DIRECTIVES
  ]
})
export class SharedModule { }
