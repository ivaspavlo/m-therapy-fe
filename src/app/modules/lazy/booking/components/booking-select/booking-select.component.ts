import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DatePipe, Location } from '@angular/common';
import { BehaviorSubject, of } from 'rxjs';
import { catchError, first, map, takeUntil } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';

import { IBookingSlot, IProduct, IResponse } from '@app/interfaces';
import { CORE_ROUTE_NAMES, ToastType } from '@app/core/constants';
import { BookingManagementService, BookingApiService, ToasterService } from '@app/core/services';
import { DestroySubscriptions } from '@app/shared/classes';
import { DialogService } from '@app/modules/ui';
import { BOOKING_ROUTE_NAMES } from '../../constants';
import { GoToCartDialogComponent } from '../go-to-cart-dialog/go-to-cart-dialog.component';

@Component({
  selector: 'app-booking-select',
  templateUrl: './booking-select.component.html',
  styleUrls: ['./booking-select.component.scss'],
  providers: [DatePipe],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookingSelectComponent extends DestroySubscriptions implements OnInit, OnDestroy {
  public form!: FormGroup;
  
  public bookingSlotsAvailable$ = new BehaviorSubject<IBookingSlot[]>([]);
  public product: IProduct | null = null;
  public CoreRouteNames = CORE_ROUTE_NAMES;
  public selectedSlots = new Map();
  private messages = {
    success: 'Added to the cart'
  }

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private datePipe: DatePipe,
    private bookingApiService: BookingApiService,
    private bookingManagementService: BookingManagementService,
    private location: Location,
    private dialogService: DialogService,
    private toasterService: ToasterService,
    private translateService: TranslateService
  ) {
    super();
  }

  ngOnInit(): void {
    this.product = this.bookingManagementService.currentProduct;

    if (this.product) {
      this.getAvailableBookingSlots(this.product.id, Date.now());
      this.initSelectedSlots();
      this.initForm();
      this.listenToDateChange();
    }
  }

  public onClickSlot(value: IBookingSlot): void {
    if (this.selectedSlots.has(value.start)) {
      this.selectedSlots.delete(value.start);
      return;
    }
    this.selectedSlots.set(value.start, value);
  }

  public onBookNow(): void {
    this.bookingManagementService.addSelectedDatesToCart(Array.from(this.selectedSlots.values()));
    this.router.navigateByUrl(`${CORE_ROUTE_NAMES.BOOKING}/${BOOKING_ROUTE_NAMES.BOOKING_PAYMENT}`);
  }

  public onAddToCart(): void {
    this.bookingManagementService.addSelectedDatesToCart(Array.from(this.selectedSlots.values()));

    this.toasterService.show(this.translateService.instant(this.messages.success), ToastType.SUCCESS);

    setTimeout(() => {
      this.dialogService.open(GoToCartDialogComponent, {}).afterClosed.pipe(
        takeUntil(this.componentDestroyed$)
      ).subscribe((value: boolean) => {
        if (value) {
          this.router.navigate([CORE_ROUTE_NAMES.BOOKING, BOOKING_ROUTE_NAMES.CART]);
        }
      });
    }, 1000);
  }

  private initForm(): void {
    this.form = this.fb.group({
      startDate: this.datePipe.transform(new Date(), 'YYYY-MM-dd')
    });
  }

  public onBack(): void {
    this.location.back();
  }

  private listenToDateChange(): void {
    this.form.controls.startDate.valueChanges.pipe(
      takeUntil(this.componentDestroyed$)
    ).subscribe((value: string) => {
      this.getAvailableBookingSlots(this.product!.id, new Date(value).getTime());
    });
  }

  private getAvailableBookingSlots(id: string, date: number): void {
    this.bookingApiService.getBookingSlots(id, date).pipe(
      first(),
      catchError(() => of(null)),
      map((res: IResponse<IBookingSlot[]> | null) => res?.success ? null : res!.data)
    ).subscribe((value: IBookingSlot[] | null) => {
      this.bookingSlotsAvailable$.next(value || []);
    });
  }

  private initSelectedSlots(): void {
    this.selectedSlots = new Map(
      (this.bookingManagementService.getCurrentBooking()?.slots || []).map(b => [b.start, b])
    );
  }

  ngOnDestroy(): void {
    this.bookingManagementService.addSelectedDatesToCart(Array.from(this.selectedSlots.values()));
  }
}
