import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';

import { UserPageComponent } from './user-page.component';
import { USER_ROUTES } from './constants';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { UserBookingsComponent } from './components/user-bookings/user-bookings.component';

const userRoutes: Route[] = [
  {
    path: '',
    component: UserPageComponent,
    children: [
      {
        path: USER_ROUTES.PROFILE,
        component: UserProfileComponent
      },
      {
        path: USER_ROUTES.BOOKINGS,
        component: UserBookingsComponent
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(userRoutes)
  ]
})
export class UserRoutingModule { }
