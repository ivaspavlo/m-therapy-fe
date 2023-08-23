import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@app/shared/shared.module';
import { CoreTranslationModule } from '@app/core/core-translation.module';
import { MainRoutingModule } from './main-routing.module';
import { MainPageComponent } from './main-page.component';
import { COMPONENTS } from './components';
import { FooterModule } from '@app/modules/ui/footer/footer.module';


@NgModule({
  declarations: [
    MainPageComponent,
    ...COMPONENTS
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    SharedModule,
    FooterModule,
    CoreTranslationModule.forChild()
  ]
})
export class MainModule { }
