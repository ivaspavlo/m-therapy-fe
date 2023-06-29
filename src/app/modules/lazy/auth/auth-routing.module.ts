import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { AuthPageComponent } from './auth-page.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { RemindComponent } from './components/remind/remind.component';
import { UpdateComponent } from './components/update/update.component';


const AUTH_ROUTE_NAMES = {
  BLANK: '',
  LOGIN: 'login',
  REGISTER: 'register',
  REMIND_PASSWORD: 'remind',
  UPDATE_PASSWORD: 'update'
};

const authRouts: Route[] = [
  {
    path: AUTH_ROUTE_NAMES.BLANK,
    component: AuthPageComponent,
    children: [{
      path: AUTH_ROUTE_NAMES.BLANK,
      pathMatch: 'full',
      redirectTo: AUTH_ROUTE_NAMES.LOGIN
    }, {
      path: AUTH_ROUTE_NAMES.LOGIN,
      data: { animationState: 'login' },
      component: LoginComponent
    }, {
      path: AUTH_ROUTE_NAMES.REGISTER,
      data: { animationState: 'register' },
      component: RegisterComponent
    }, {
      path: AUTH_ROUTE_NAMES.REMIND_PASSWORD,
      data: { animationState: 'remind' },
      component: RemindComponent
    }, {
      path: AUTH_ROUTE_NAMES.UPDATE_PASSWORD,
      data: { animationState: 'update' },
      component: UpdateComponent
    }]
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(authRouts)
  ]
})
export class AuthRoutingModule { }
