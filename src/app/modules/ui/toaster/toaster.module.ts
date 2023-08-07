import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { ToasterService } from './toaster.service';


@NgModule({
  imports: [
    CommonModule,
  ],
  providers: [
    provideAnimations(),
    provideToastr(),
    ToasterService
  ]
})
export class ToasterModule { }
