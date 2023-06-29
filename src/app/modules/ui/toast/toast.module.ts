import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { OverlayModule } from '@angular/cdk/overlay';

import { ToastComponent } from './container/toast.component';
import { TOAST_CONFIG_TOKEN, defaultToastConfig } from './toast-config';


@NgModule({
  declarations: [
    ToastComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    OverlayModule
  ],
  providers: [
    {
      provide: TOAST_CONFIG_TOKEN,
      useValue: defaultToastConfig
    }
  ]
})
export class ToastModule { }
