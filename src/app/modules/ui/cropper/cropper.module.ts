import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageCropperModule } from 'ngx-image-cropper';
import { CoreTranslationModule } from '@core/core-translation.module';
import { COMPONENTS } from './components';


@NgModule({
  declarations: [
    ...COMPONENTS
  ],
  imports: [
    CommonModule,
    ImageCropperModule,
    CoreTranslationModule.forChild()
  ],
  exports: [
    ...COMPONENTS
  ]
})
export class CropperModule { }
