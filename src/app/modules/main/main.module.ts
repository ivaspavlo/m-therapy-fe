import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@app/shared/shared.module';
import { MainRoutingModule } from './main-routing.module';
import { COMPONENTS } from './components';


@NgModule({
  declarations: [
    ...COMPONENTS
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    SharedModule
  ]
})
export class MainModule { }
