import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DestroySubscriptions } from '@app/shared/classes';
import { AuthRoutingAnimations } from './constants/auth-routing-animations.constant';


@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.scss'],
  animations: [ AuthRoutingAnimations ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthPageComponent extends DestroySubscriptions {

  constructor(
    private toastrService: ToastrService
  ) {
    super();
  }

  public prepareRoute(outlet: RouterOutlet): boolean {
		return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animationState'];
	}
}
