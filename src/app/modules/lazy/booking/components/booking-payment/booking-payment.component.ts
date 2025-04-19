import { ChangeDetectionStrategy, Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { catchError, map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

import { IBookingRes, ICart, ICartTotals, IContent, IProductBooking, IResponse } from '@app/interfaces';
import { INPUT_TYPES, ToastType, USER_EMAIL } from '@app/core/constants';
import { BookingApiService, BookingManagementService, ContentApiService, ToasterService } from '@app/core/services';
import { LOCAL_STORAGE } from '@app/core/providers';
import { AUTH_ROUTE_NAMES } from '@app/modules/lazy/auth/constants';

enum CONTROL_NAME {
  EMAIL = 'email',
  PHONE = 'phone',
  COMMENT = 'comment'
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
  public noRegistering: boolean = false;
  public fileName: string = '';
  public fileHasError: boolean = false;
  public loggedInEmail: string | null = null;

  private maxSize = 10 * 1024 * 1024; // 10MB in bytes
  private allowedFormats = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'];

  constructor(
    @Inject(LOCAL_STORAGE) private localStorage: Storage,
    private bookingApiService: BookingApiService,
    private fb: FormBuilder,
    private router: Router,
    private bookingManagementService: BookingManagementService,
    private contentApiService: ContentApiService,
    private translateService: TranslateService,
    private location: Location,
    private toasterService: ToasterService
  ) {
    this.content$ = this.contentApiService.getContent().pipe(
      catchError(() => of(null)),
      map((res: IResponse<IContent> | null) => res?.data || null)
    );

    this.cart = this.bookingManagementService.cart;
    this.currentBooking = this.bookingManagementService.getCurrentBooking();
    this.cartTotals = this.bookingManagementService.getTotals();

    this.cartTotals = this.currentBooking
      ? { slotsQty: this.currentBooking.slots.length, price: this.currentBooking.product.price * this.currentBooking.slots.length }
      : this.cartTotals;
  }

  ngOnInit(): void {
    if (this.cart && this.cartTotals) {
      this.loggedInEmail = this.localStorage.getItem(USER_EMAIL) || null;
      this.initForm(this.cart);
    }
  }

  public goWithoutRegistering(): void {
    this.noRegistering = !this.noRegistering;
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
    this.bookingApiService.book(this.formGroup.value).pipe(
      catchError(() => of(null))
    ).subscribe((res: IResponse<IBookingRes> | null) => {
      res
        ? this.toasterService.show(this.translateService.instant(this.messages.success), ToastType.SUCCESS)
        : this.toasterService.show(this.translateService.instant(this.messages.failure), ToastType.ERROR);

      
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
    this.formGroup = this.fb.group({
      [CONTROL_NAME.EMAIL]: this.fb.control(this.loggedInEmail || cart.email || '', [Validators.required, Validators.email]),
      [CONTROL_NAME.PHONE]: this.fb.control(cart.phone || '', [Validators.required]),
      [CONTROL_NAME.COMMENT]: this.fb.control(cart.comment || ''),
      lang: cart.lang || this.translateService.currentLang,
      bookings: cart.bookings,
      paymentFile: null
    });
  }
}
