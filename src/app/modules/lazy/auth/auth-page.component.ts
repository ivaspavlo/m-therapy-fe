import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppRoutingAnimations } from './constants/auth-routing-animations.constant';

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.scss'],
  animations: [ AppRoutingAnimations ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthPageComponent {
  public prepareRoute(outlet: RouterOutlet): boolean {
		return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animationState'];
	}
}
