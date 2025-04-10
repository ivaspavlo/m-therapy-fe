import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { CORE_ROUTE_NAMES } from '@app/core/constants';
import { BOOKING_ROUTE_NAMES } from '../../constants';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CartComponent {

  constructor(
    private router: Router
  ) {}

  public onConfirmBooking(): void {
    this.router.navigate([CORE_ROUTE_NAMES.BOOKING, BOOKING_ROUTE_NAMES.BOOKING_PAYMENT]);
  }
}
