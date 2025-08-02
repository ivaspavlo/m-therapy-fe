import { ChangeDetectionStrategy, Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { catchError, first, map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

import { IBookingSlot, ICart, ICartTotals, IContent, IProductBooking, IResponse, IUser } from '@app/interfaces';
import { INPUT_TYPES, ToastType } from '@app/core/constants';
import { BookingApiService, BookingManagementService, ContentApiService, ToasterService, UserManagementService } from '@app/core/services';
import { AUTH_ROUTE_NAMES } from '@app/modules/lazy/auth/constants';

enum CONTROL_NAME {
  EMAIL = 'email',
  PHONE = 'phone',
  COMMENT = 'comment',
  PAYMENT_FILE = 'paymentFile',
  LANG = 'lang',
  BOOKINGS = 'bookings'
}

@Component({
  selector: 'app-booking-payment',
  templateUrl: './booking-payment.component.html',
  styleUrls: ['./booking-payment.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookingPaymentComponent implements OnInit {
  @ViewChild('paymentFileInput') paymentFileInput!: ElementRef;

  public content$: Observable<IContent | null>;
  public cartTotals: ICartTotals | null = null;
  public cart: ICart | null = null;
  private currentBooking: IProductBooking | null = null; 
  private messages = {
    success: 'products.booking.success',
    failure: 'products.booking.failure',
  }

  public INPUT_TYPES = INPUT_TYPES;
  public CONTROL_NAME = CONTROL_NAME;
  public formGroup!: FormGroup;
  public goWithoutRegister: boolean = false;
  public isSuccessfullyBooked: boolean = false;
  public fileName: string = '';
  public fileHasError: boolean = false;
  public userData$!: Observable<IUser | null>;

  private maxSize = 10 * 1024 * 1024; // 10MB in bytes
  private allowedFormats = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'];
  private buyNowMode: boolean = false;

  constructor(
    private bookingApiService: BookingApiService,
    private fb: FormBuilder,
    private router: Router,
    private bookingManagementService: BookingManagementService,
    private contentApiService: ContentApiService,
    private translateService: TranslateService,
    private location: Location,
    private toasterService: ToasterService,
    private userService: UserManagementService
  ) {
    this.content$ = this.contentApiService.getContent().pipe(
      catchError(() => of(null)),
      map((res: IResponse<IContent> | null) => res?.data || null)
    );

    this.cart = this.bookingManagementService.cart;
    this.currentBooking = this.bookingManagementService.getCurrentBooking();
    this.buyNowMode = !!this.currentBooking;

    this.cartTotals = this.currentBooking
      ? { slotsQty: this.currentBooking.slots.length, price: this.currentBooking.product.price * this.currentBooking.slots.length }
      : this.bookingManagementService.getTotals();

    this.userData$ = this.userService.currentUser$;
  }

  ngOnInit(): void {
    if (this.cart && this.cartTotals) {
      this.initForm(this.cart);
    }
  }

  public goWithoutRegistering(): void {
    this.goWithoutRegister = !this.goWithoutRegister;
  }

  public onRegister(): void {
    this.router.navigateByUrl(`${AUTH_ROUTE_NAMES.SELF}/${AUTH_ROUTE_NAMES.REGISTER}`);
  }

  public onFileChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      this.fileHasError = !this.isFileValid(target.files);
      this.fileName = `${target.files[0].name.substring(0, 30)}...`;
      this.formGroup.controls.paymentFile.setValue(target.files[0]);
    }
  }

  public onClearFile(): void {
    this.fileName = '';
    this.paymentFileInput.nativeElement.value = '';
    this.formGroup.controls.paymentFile.reset();
    this.fileHasError = false;
  }

  public onBack(): void {
    this.location.back();
  }

  public onConfirmBooking(): void {
    const formValue = this.formGroup.value;
    const req = new FormData();

    const bookedSlots = formValue[CONTROL_NAME.BOOKINGS].slots.map((s: IBookingSlot) => s.id);

    req.append(CONTROL_NAME.PAYMENT_FILE, formValue[CONTROL_NAME.PAYMENT_FILE]);
    req.append(CONTROL_NAME.EMAIL, formValue[CONTROL_NAME.EMAIL]);
    req.append(CONTROL_NAME.PHONE, formValue[CONTROL_NAME.PHONE]);
    req.append(CONTROL_NAME.COMMENT, formValue[CONTROL_NAME.COMMENT]);
    req.append(CONTROL_NAME.BOOKINGS, JSON.stringify(bookedSlots));
    req.append(CONTROL_NAME.LANG, formValue[CONTROL_NAME.LANG]);

    debugger;

    this.bookingApiService.book(req).pipe(
      catchError(() => of(null))
    ).subscribe((res: IResponse<any> | null) => {
      if (!res) {
        this.toasterService.show(this.translateService.instant(this.messages.failure), ToastType.ERROR);
        return;
      }

      this.isSuccessfullyBooked = true;

      this.toasterService.show(this.translateService.instant(this.messages.success), ToastType.SUCCESS);

      if (!this.buyNowMode) {
        this.bookingManagementService.resetCart();
      } else {
        this.bookingManagementService.removeProductFromCart(this.currentBooking!.product);
      }

      this.router.navigate(['/']);
    });
  }

  private isFileValid(files: FileList): boolean {
    const file = files[0];

    if (file.size > this.maxSize || !this.allowedFormats.includes(file.type)) {
      return false;
    }

    return true;
  }

  private initForm(cart: ICart): void {
    this.userData$.pipe(first()).subscribe((user: IUser | null) => {
      this.formGroup = this.fb.group({
        [CONTROL_NAME.EMAIL]: this.fb.control(user?.email || cart.email || '', [Validators.required, Validators.email]),
        [CONTROL_NAME.PHONE]: this.fb.control(user?.phone || cart.phone || '', [Validators.required]),
        [CONTROL_NAME.COMMENT]: this.fb.control(cart.comment || ''),
        [CONTROL_NAME.LANG]: cart.lang || this.translateService.currentLang,
        [CONTROL_NAME.BOOKINGS]: cart.bookings,
        [CONTROL_NAME.PAYMENT_FILE]: null
      });
    });
  }
}
