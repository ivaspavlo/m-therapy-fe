import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { UserComponent } from './user.component';

const userRoutes: Route[] = [
  {
    path: '',
    component: UserComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(userRoutes)
  ]
})
export class UserRoutingModule { }
