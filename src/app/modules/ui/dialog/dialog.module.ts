import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DialogComponent } from './container/dialog.component';
import { InsertionDirective } from './directives/insertion.directive';


@NgModule({
    declarations: [
        DialogComponent,
        InsertionDirective
    ],
    imports: [
        CommonModule
    ],
    exports: [
        DialogComponent
    ]
})
export class DialogModule { }
