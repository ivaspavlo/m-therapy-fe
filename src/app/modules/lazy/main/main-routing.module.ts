import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { CORE_ROUTE_NAMES } from '@app/core/constants';
import { MainPageComponent } from './main-page.component';
import { UnsubscribePageComponent } from './components/unsubscribe-page/unsubscribe-page.component';


const mainRouts: Route[] = [
  {
    path: CORE_ROUTE_NAMES.BLANK,
    pathMatch: 'full',
    component: MainPageComponent
  }, {
    path: CORE_ROUTE_NAMES.UNSUBSCRIBE,
    component: UnsubscribePageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(mainRouts)]
})
export class MainRoutingModule { }
