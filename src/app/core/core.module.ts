import { NgModule, Optional, SkipSelf } from '@angular/core';
import { ToastrModule } from 'ngx-toastr';
import { CoreRoutingModule } from './core-routing.module';
import { CoreTranslationModule } from './core-translation.module';
import { CORE_PROVIDERS } from './providers';


@NgModule({
  imports: [
    CoreRoutingModule,
    ToastrModule.forRoot(),
    CoreTranslationModule.forRoot()
  ],
  providers: [
    ...CORE_PROVIDERS
  ],
  exports: [CoreRoutingModule]
})
export class CoreModule {
  constructor(
    @Optional() @SkipSelf() parentModule: CoreModule
  ) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import available only in AppModule');
    }
  }
}
