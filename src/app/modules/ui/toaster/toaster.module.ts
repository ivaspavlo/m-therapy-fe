import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastrModule } from 'ngx-toastr';
import { ToasterService } from './toaster.service';


@NgModule({
  imports: [
    CommonModule,
    ToastrModule
  ],
  providers: [
    ToasterService
  ]
})
export class ToasterModule { }
