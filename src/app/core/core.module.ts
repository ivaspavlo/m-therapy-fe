import { NgModule } from '@angular/core';
import { CoreRoutingModule } from './core-routing.module';


@NgModule({
  imports: [CoreRoutingModule],
  exports: [CoreRoutingModule]
})
export class CoreModule { }
