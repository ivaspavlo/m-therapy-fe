import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppRoutingAnimations } from '../auth/constants';

@Component({
  selector: 'app-booking',
  templateUrl: './booking-page.component.html',
  styleUrls: ['./booking-page.component.scss'],
  animations: [ AppRoutingAnimations ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookingPageComponent {
  public prepareRoute(outlet: RouterOutlet): boolean {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animationState'];
  }
}
