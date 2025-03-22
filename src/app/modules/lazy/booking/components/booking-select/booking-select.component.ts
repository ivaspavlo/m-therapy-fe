import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Observable, of } from 'rxjs';
import { catchError, first, map } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';

import { IBookingSlot, IProduct, IResponse } from '@app/interfaces';
import { CORE_ROUTE_NAMES, LANGUAGE } from '@app/core/constants';
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
    private translateService: TranslateService,
    private bookingApiService: BookingApiService,
    private bookingManagementService: BookingManagementService
  ) {
    super();
  }

  ngOnInit(): void {
    this.product = this.bookingManagementService.currentProduct;
    this.initBookingSlots();
    this.initSelectedSlots();
    this.initForm();
  }

  public onClickSlot(index: number, value: IBookingSlot): void {
    if (this.selectedSlots.has(index)) {
      this.selectedSlots.delete(index);
      return;
    }
    this.selectedSlots.set(index, value);
  }

  public onSubmit(): void {
    const cart = this.bookingManagementService.cart;
    const cartSlots = this.bookingManagementService.currentBookings?.dates || [];
    const currentSlots = Array.from(this.selectedSlots.values());

    // Combine selected dates with dates from the cart and remove duplicates.
    const currentDates = Object.values([...cartSlots, ...currentSlots].reduce((acc, curr)=> {
      acc[curr.startDate] = curr;
      return acc;
    }, {})) as IBookingSlot[];

    const currentBookings = {
      // Product is a prerequisite for this page.
      product: this.bookingManagementService.currentProduct as IProduct,
      dates: currentDates
    }

    const updateCart = {
      ...cart,
      bookings: [...cart?.bookings || [], currentBookings],
      lang: this.translateService.currentLang as LANGUAGE
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
    this.selectedSlots = new Map(Object.entries(this.bookingManagementService.currentBookings?.dates || []));
    debugger;
  }

  private initBookingSlots(): void {
    this.bookingSlots$ = this.bookingApiService.getBookingSlots().pipe(
      first(),
      catchError(() => of(null)),
      map((res: IResponse<IBookingSlot[]> | null) => res === null || !res.success ? null : res.data)
    );
  }
}
