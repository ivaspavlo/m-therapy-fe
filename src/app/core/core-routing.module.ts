import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { CORE_ROUTE_NAMES } from './constants';


const coreRouts: Route[] = [
  {
    path: CORE_ROUTE_NAMES.BLANK,
    pathMatch: 'full',
    loadChildren: () => import('@app/modules/main/main.module').then(m => m.MainModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(coreRouts)],
  exports: [RouterModule]
})
export class CoreRoutingModule { }
