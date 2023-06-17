import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RouteTransitionAnimations } from '@app/core/constants';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  animations: [RouteTransitionAnimations]
})
export class AppComponent {

  public prepareRoute(outlet: RouterOutlet): boolean {
    console.log(outlet && outlet.activatedRouteData && outlet.activatedRouteData['animationState']);
		return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animationState'];
	}

}
