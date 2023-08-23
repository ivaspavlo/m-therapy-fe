import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthRoutingAnimations } from './constants/auth-routing-animations.constant';


@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.scss'],
  animations: [ AuthRoutingAnimations ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthPageComponent {
  constructor(
    private toastrService: ToastrService
  ) { }

  public prepareRoute(outlet: RouterOutlet): boolean {
		return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animationState'];
	}
}
