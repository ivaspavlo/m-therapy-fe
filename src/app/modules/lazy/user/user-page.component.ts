import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppRoutingAnimations } from '../auth/constants';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss'],
  animations: [ AppRoutingAnimations ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserPageComponent {
  public prepareRoute(outlet: RouterOutlet): boolean {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animationState'];
  }
}
