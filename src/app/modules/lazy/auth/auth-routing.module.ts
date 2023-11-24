import { NgModule, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRouteSnapshot, Route, RouterModule } from '@angular/router';
import { AuthService } from '@app/core/services';
import { AuthPageComponent } from './auth-page.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { RemindComponent } from './components/remind/remind.component';
import { UpdateComponent } from './components/update/update.component';
import { RegisterConfirmComponent } from './components/register-confirm/register-confirm.component';


const AUTH_ROUTE_NAMES = {
  BLANK: '',
  LOGIN: 'login',
  REGISTER: 'register',
  REGISTER_CONFIRM: 'register-confirm/:token',
  REMIND_PASSWORD: 'remind',
  UPDATE_PASSWORD: 'update/:token'
};

const authRouts: Route[] = [
  {
    path: AUTH_ROUTE_NAMES.BLANK,
    component: AuthPageComponent,
    children: [{
      path: AUTH_ROUTE_NAMES.BLANK,
      pathMatch: 'full',
      redirectTo: AUTH_ROUTE_NAMES.REGISTER
    }, {
      path: AUTH_ROUTE_NAMES.LOGIN,
      data: { animationState: 'login' },
      component: LoginComponent
    }, {
      path: AUTH_ROUTE_NAMES.REGISTER,
      data: { animationState: 'register' },
      component: RegisterComponent
    }, {
      path: AUTH_ROUTE_NAMES.REGISTER_CONFIRM,
      component: RegisterConfirmComponent,
      resolve: {
        data: (route: ActivatedRouteSnapshot) => {
          return inject(AuthService).registerConfirm(route.paramMap.get('token')!);
        }
      }
    }, {
      path: AUTH_ROUTE_NAMES.REMIND_PASSWORD,
      data: { animationState: 'remind' },
      component: RemindComponent
    }, {
      path: AUTH_ROUTE_NAMES.UPDATE_PASSWORD,
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
