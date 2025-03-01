import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { MainPageComponent } from './main-page.component';


const mainRouts: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    component: MainPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(mainRouts)]
})
export class MainRoutingModule { }
