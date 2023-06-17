import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { CORE_ROUTE_NAMES } from '@app/core/constants';
import { MainPageComponent } from './components/main-page/main-page.component';


const mainRouts: Route[] = [
  {
    path: CORE_ROUTE_NAMES.BLANK,
    pathMatch: 'full',
    component: MainPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(mainRouts)]
})
export class MainRoutingModule { }