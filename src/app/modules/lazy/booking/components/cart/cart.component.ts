import { ChangeDetectionStrategy, Component } from "@angular/core";
import { Router } from "@angular/router";

import { ICartTotals, IProduct, IProductBooking } from "@app/interfaces";
import { CORE_ROUTE_NAMES } from "@app/core/constants";
import { BookingManagementService } from "@app/core/services";
import { BOOKING_ROUTE_NAMES } from "../../constants";

@Component({
  selector: "app-cart",
  templateUrl: "./cart.component.html",
  styleUrls: ["./cart.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartComponent {
  public productBookings: IProductBooking[];
  public cartTotals: ICartTotals | null;

  constructor(
    private router: Router,
    private bookingManagementService: BookingManagementService
  ) {
    this.productBookings = this.bookingManagementService.cart?.bookings || [];
    this.cartTotals = this.bookingManagementService.getTotals();
  }

  public onConfirmBooking(): void {
    if (this.productBookings.length) {
      this.bookingManagementService.resetCurrentProduct();
    }

    this.router.navigate([
      CORE_ROUTE_NAMES.BOOKING,
      BOOKING_ROUTE_NAMES.BOOKING_PAYMENT,
    ]);
  }

  public onBookingItemClick(product: IProduct): void {
    this.bookingManagementService.setCurrentProduct(product);
    this.router.navigate([
      CORE_ROUTE_NAMES.BOOKING,
      BOOKING_ROUTE_NAMES.BOOKING_SELECT,
    ]);
  }
}
