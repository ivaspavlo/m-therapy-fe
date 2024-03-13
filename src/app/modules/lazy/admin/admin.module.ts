import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreTranslationModule } from '@app/core/core-translation.module';
import { AdminRoutingModule } from './admin-routing.module';
import { SharedModule } from '@app/shared/shared.module';
import { FooterModule, HeaderModule } from '@app/modules/ui';
import { COMPONENTS } from './components';


@NgModule({
  declarations: [
    ...COMPONENTS
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    HeaderModule,
    FooterModule,
    CoreTranslationModule.forChild()
  ]
})
export class AdminModule { }
