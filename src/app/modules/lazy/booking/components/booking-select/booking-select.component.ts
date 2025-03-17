import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { combineLatest, Observable, of } from 'rxjs';
import { catchError, map, shareReplay } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';

import { IBookingSlot, IContent, IProductBooking, IResponse } from '@app/interfaces';
import { CORE_ROUTE_NAMES, LANGUAGE } from '@app/core/constants';
import { ContentApiService } from '@app/core/services';
import { DestroySubscriptions } from '@app/shared/classes';
import { BookingManagementService } from '@app/core/services/booking-management.service';
import { BOOKING_ROUTE_NAMES } from '../../constants';

@Component({
  selector: 'app-booking-select',
  templateUrl: './booking-select.component.html',
  styleUrls: ['./booking-select.component.scss'],
  providers: [DatePipe],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookingSelectComponent extends DestroySubscriptions implements OnInit {
  public data$!: Observable<{ product: IProductBooking | null, content: IContent | null}>;
  public content$!: Observable<IContent | null>;
  public product$!: Observable<IProductBooking | null>;
  public form!: FormGroup;
  public CoreRouteNames = CORE_ROUTE_NAMES;
  public selectedSlots = new Map();

  constructor(
    private fb: FormBuilder,
    private datePipe: DatePipe,
    private contentApiService: ContentApiService,
    private translateService: TranslateService,
    private router: Router,
    private bookingManagementService: BookingManagementService
  ) {
    super();

    
  }

  ngOnInit(): void {
    this.initData();
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
    }, {}));

    const currentBookings = {
      product: this.bookingManagementService.currentBookings?.product,
      dates: currentDates
    }

    const bookingData = {
      bookings: [...cart?.bookings || [], currentBookings],
      lang: this.translateService.currentLang as LANGUAGE
    }

    this.router.navigateByUrl(`${CORE_ROUTE_NAMES.BOOKING}/${BOOKING_ROUTE_NAMES.BOOKING_PAYMENT}`);
  }

  private initData(): void {
    const currentBookings$ = of(this.bookingManagementService.currentBookings);

    const content$ = this.contentApiService.getContent().pipe(
      catchError(() => of(null)),
      map((res: IResponse<IContent> | null) => res?.data || null)
    );

    this.data$ = combineLatest([currentBookings$, content$]).pipe(
      map(([product, content]: [IProductBooking | null, IContent | null]) => ({ product, content })),
      shareReplay()
    );
  }

  private initForm(): void {
    this.form = this.fb.group({
      startDate: this.datePipe.transform(new Date(), 'YYYY-MM-dd')
    });
  }
}
