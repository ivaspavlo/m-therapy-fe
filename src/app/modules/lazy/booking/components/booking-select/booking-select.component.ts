import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DatePipe, Location } from '@angular/common';
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
  public product: IProduct | null;
  public bookingSlots$: Observable<IBookingSlot[] | null>;
  public form!: FormGroup;
  public CoreRouteNames = CORE_ROUTE_NAMES;
  public selectedSlots = new Map();

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private datePipe: DatePipe,
    private bookingApiService: BookingApiService,
    private bookingManagementService: BookingManagementService,
    private location: Location
  ) {
    super();

    this.product = this.bookingManagementService.currentProduct;

    this.bookingSlots$ = this.bookingApiService.getBookingSlots().pipe(
      first(),
      catchError(() => of(null)),
      map((res: IResponse<IBookingSlot[]> | null) => res === null || !res.success ? null : res.data)
    );
  }

  ngOnInit(): void {
    if (this.product) {
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
    this.bookingManagementService.addSelectedDatesToCart(Array.from(this.selectedSlots.values()));
    this.router.navigateByUrl(`${CORE_ROUTE_NAMES.BOOKING}/${BOOKING_ROUTE_NAMES.BOOKING_PAYMENT}`);
  }

  private initForm(): void {
    this.form = this.fb.group({
      startDate: this.datePipe.transform(new Date(), 'YYYY-MM-dd')
    });
  }

  public onBack(): void {
    this.location.back();
  }

  private initSelectedSlots(): void {
    this.selectedSlots = new Map(
      (this.bookingManagementService.getCurrentBooking()?.slots || []).map(b => [b.start, b])
    );
  }
}
