import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { CORE_ROUTE_NAMES } from '@app/core/constants';
import { AuthPageComponent } from './components/auth-page/auth-page.component';


const authRouts: Route[] = [
  {
    path: CORE_ROUTE_NAMES.BLANK,
    pathMatch: 'full',
    component: AuthPageComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(authRouts)
  ]
})
export class AuthRoutingModule { }
