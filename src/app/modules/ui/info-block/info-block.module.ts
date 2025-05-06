import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@app/shared/shared.module';
import { CoreTranslationModule } from '@app/core/core-translation.module';
import { InfoBlockComponent } from './info-block.component';

@NgModule({
  declarations: [
    InfoBlockComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    CoreTranslationModule.forChild()
  ],
  exports: [
    InfoBlockComponent
  ]
})
export class InfoBlockModule { }
