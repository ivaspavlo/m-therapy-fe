import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '@app/shared/shared.module';
import { CoreTranslationModule } from '@app/core/core-translation.module';
import { DialogModule } from '@app/modules/ui/dialog';
import { FooterComponent } from './footer.component';
import { TeamModalComponent } from './team-modal/team-modal.component';


@NgModule({
  declarations: [
    FooterComponent,
    TeamModalComponent
  ],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    SharedModule,
    DialogModule,
    CoreTranslationModule.forChild()
  ],
  exports: [
    FooterComponent
  ]
})
export class FooterModule { }
