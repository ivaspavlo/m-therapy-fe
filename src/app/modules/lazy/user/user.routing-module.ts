import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { UserPageComponent } from './user-page.component';

const userRoutes: Route[] = [
  {
    path: '',
    component: UserPageComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(userRoutes)
  ]
})
export class UserRoutingModule { }
