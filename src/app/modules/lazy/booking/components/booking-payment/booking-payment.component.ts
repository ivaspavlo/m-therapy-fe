import { ChangeDetectionStrategy, Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { INPUT_TYPES, USER_EMAIL } from '@app/core/constants';
import { ICart, IContent, IProductBooking, IResponse } from '@app/interfaces';

import { AUTH_ROUTE_NAMES } from '@app/modules/lazy/auth/auth-routing.module';
import { BookingApiService, BookingManagementService, ContentApiService } from '@app/core/services';
import { catchError, first, map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { BOOKING_ROUTE_NAMES } from '../../constants';
import { LOCAL_STORAGE } from '@app/core/providers';

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
export class BookingPaymentComponent {
  @ViewChild('paymentFileInput') paymentFileInput!: ElementRef;

  public content$: Observable<IContent | null>;

  public cart: ICart | null = null;
  public currentBookings: IProductBooking | null = null;

  public INPUT_TYPES = INPUT_TYPES;
  public emailControlName: string = 'email';
  public formGroup!: FormGroup;
  public noRegistering: boolean = false;
  public fileName: string = '';
  public fileHasError: boolean = false;
  
  public backUrl: string[] = ['../', BOOKING_ROUTE_NAMES.BOOKING_SELECT];
  public loggedInEmail: string | null = null;

  private maxSize = 10 * 1024 * 1024; // 10MB in bytes
  private allowedFormats = ['application/pdf', 'image/jpeg', 'image/png'];

  constructor(
    @Inject(LOCAL_STORAGE) private localStorage: Storage,
    private bookingApiService: BookingApiService,
    private fb: FormBuilder,
    private router: Router,
    private bookingManagementService: BookingManagementService,
    private contentApiService: ContentApiService
  ) {
    this.content$ = this.contentApiService.getContent().pipe(
      catchError(() => of(null)),
      map((res: IResponse<IContent> | null) => res?.data || null)
    );

    // this.currentBookings = this.bookingManagementService.currentBookings;
  }

  ngOnInit(): void {
    if (this.cart && this.currentBookings) {
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

  public onConfirmBooking(): void {
    const req = this.formGroup.value;

    // this.bookingApiService.setPreBooking(req);
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
      bookings: cart.bookings,
      lang: cart.lang,
      paymentFile: null
    });
  }
}
