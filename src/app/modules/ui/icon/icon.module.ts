import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { COMPONENTS } from './components';


@NgModule({
  declarations: [
    ...COMPONENTS
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ...COMPONENTS
  ]
})
export class IconModule { }
