import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { CORE_ROUTE_NAMES } from '@app/core/constants';
import { AdminPageComponent } from './admin-page.component';


const mainRouts: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    component: AdminPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(mainRouts)]
})
export class AdminRoutingModule { }
