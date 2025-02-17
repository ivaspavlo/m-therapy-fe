import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Data, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AsyncPipe, DatePipe, TitleCasePipe } from '@angular/common';
import { combineLatest, Observable, of } from 'rxjs';
import { catchError, map, takeUntil } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';

import { IBookingSlot, IContent, IProductBooking, IResponse } from '@app/interfaces';
import { CORE_ROUTE_NAMES, LANGUAGE, USER_EMAIL } from '@app/core/constants';
import { BookingApiService, ContentApiService, UserManagementService } from '@app/core/services';
import { LOCAL_STORAGE } from '@app/core/providers';
import { DialogService } from '@app/modules/ui';
import { DestroySubscriptions } from '@app/shared/classes';
import { PreBookingDialogComponent } from './components';
import { IPaymentData } from '@app/interfaces/api/payment-data.interface';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
  providers: [DatePipe, AsyncPipe, TitleCasePipe, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductComponent extends DestroySubscriptions implements OnInit {
  public data$!: Observable<{ product: IProductBooking | null, content: IContent | null}>;
  public content$!: Observable<IContent | null>;
  public product$!: Observable<IProductBooking | null>;

  public form!: FormGroup;
  public CoreRouteNames = CORE_ROUTE_NAMES;
  public selectedSlots = new Map();

  constructor(
    @Inject(LOCAL_STORAGE) private localStorage: Storage,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private datePipe: DatePipe,
    private bookingApiService: BookingApiService,
    private contentApiService: ContentApiService,
    private userService: UserManagementService,
    private translateService: TranslateService,
    private dialogService: DialogService
  ) {
    super();
  }

  ngOnInit(): void {
    const product$ = this.activatedRoute.data.pipe(
      map((res: Data) => res?.product || null)
    );

    const content$ = this.contentApiService.getContent().pipe(
      catchError(() => of(null)),
      map((res: IResponse<IContent> | null) => res?.data || null)
    );

    this.data$ = combineLatest([product$, content$]).pipe(
      map(([product, content]: [IProductBooking | null, IContent | null]) => ({ product, content }))
    );

    this.form = this.fb.group({
      startDate: this.datePipe.transform(new Date(), 'YYYY-MM-dd')
    });
  }

  public onClickSlot(index: number, value: IBookingSlot): void {
    if (this.selectedSlots.has(index)) {
      this.selectedSlots.delete(index);
      return;
    }
    this.selectedSlots.set(index, value);
  }

  public onSubmit(price: number, paymentData: IPaymentData): void {
    if (!this.userService.isLoggedIn) {
      const dialogData = {
        price,
        paymentData,
        datesSelected: Array.from(this.selectedSlots.values())
      };

      this.dialogService.open(PreBookingDialogComponent, dialogData).afterClosed.pipe(
        takeUntil(this.componentDestroyed$)
      ).subscribe(() => {
        // to be developed
        console.log('works');
      });
      return;
    }

    const req = {
      email: this.localStorage.getItem(USER_EMAIL) as string,
      bookingSlots: Array.from(this.selectedSlots, ([_, value]) => value),
      lang: this.translateService.currentLang as LANGUAGE
    }

    this.bookingApiService.setPreBooking(req);
  }
}
