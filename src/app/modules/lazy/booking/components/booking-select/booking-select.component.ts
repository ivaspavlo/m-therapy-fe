import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Observable, of } from 'rxjs';
import { catchError, first, map } from 'rxjs/operators';

import { IBookingSlot, IProduct, IResponse } from '@app/interfaces';
import { CORE_ROUTE_NAMES } from '@app/core/constants';
import { BookingManagementService, BookingApiService } from '@app/core/services';
import { DestroySubscriptions } from '@app/shared/classes';
import { BOOKING_ROUTE_NAMES } from '../../constants';

@Component({
  selector: 'app-booking-select',
  templateUrl: './booking-select.component.html',
  styleUrls: ['./booking-select.component.scss'],
  providers: [DatePipe],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookingSelectComponent extends DestroySubscriptions implements OnInit {

  public product!: IProduct | null;
  public bookingSlots$!: Observable<IBookingSlot[] | null>;
  public form!: FormGroup;
  public CoreRouteNames = CORE_ROUTE_NAMES;
  public selectedSlots = new Map();

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private datePipe: DatePipe,
    private bookingApiService: BookingApiService,
    private bookingManagementService: BookingManagementService
  ) {
    super();
  }

  ngOnInit(): void {
    this.product = this.bookingManagementService.currentProduct;

    if (this.product) {
      this.initBookingSlots();
      this.initSelectedSlots();
      this.initForm();
    }
  }

  public onClickSlot(value: IBookingSlot): void {
    if (this.selectedSlots.has(value.start)) {
      this.selectedSlots.delete(value.start);
      return;
    }
    this.selectedSlots.set(value.start, value);
  }

  public onSubmit(): void {
    const allBookings = this.bookingManagementService.cart?.bookings || [];
    const datesForCurrentProduct = allBookings.find(b => b.product.id === this.product?.id)?.dates || [];
    const currentSlots = Array.from(this.selectedSlots.values());

    // Combine selected dates with dates from the cart and remove duplicates.
    const combinedDates = Object.values([...datesForCurrentProduct, ...currentSlots].reduce((acc, curr)=> {
      acc[curr.startDate] = curr;
      return acc;
    }, {})) as IBookingSlot[];

    const currentBookings = {
      product: this.product as IProduct,
      dates: combinedDates
    }

    const updateCart = {
      ...this.bookingManagementService.cart,
      bookings: !!datesForCurrentProduct.length
        ? allBookings.map(b => b.product.id === currentBookings.product?.id ? currentBookings : b)
        : [currentBookings]
    }

    this.bookingManagementService.addToCart(updateCart);

    this.router.navigateByUrl(`${CORE_ROUTE_NAMES.BOOKING}/${BOOKING_ROUTE_NAMES.BOOKING_PAYMENT}`);
  }

  private initForm(): void {
    this.form = this.fb.group({
      startDate: this.datePipe.transform(new Date(), 'YYYY-MM-dd')
    });
  }

  private initSelectedSlots(): void {
    const allBookings = this.bookingManagementService.cart?.bookings || [];
    const datesForCurrentProduct = allBookings.find(b => b.product.id === this.product?.id)?.dates || [];
    this.selectedSlots = new Map(datesForCurrentProduct.map(b => [b.start, b]));
  }

  private initBookingSlots(): void {
    this.bookingSlots$ = this.bookingApiService.getBookingSlots().pipe(
      first(),
      catchError(() => of(null)),
      map((res: IResponse<IBookingSlot[]> | null) => res === null || !res.success ? null : res.data)
    );
  }
}
