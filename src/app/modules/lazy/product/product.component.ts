import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Data, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AsyncPipe, DatePipe, TitleCasePipe } from '@angular/common';
import { Observable } from 'rxjs';
import { map, shareReplay, takeUntil } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';

import { IBookingSlot, IProductBooking } from '@app/interfaces';
import { CORE_ROUTE_NAMES, LANGUAGE, USER_EMAIL } from '@app/core/constants';
import { BookingApiService, UserManagementService } from '@app/core/services';
import { LOCAL_STORAGE } from '@app/core/providers';
import { DialogService } from '@app/modules/ui';
import { DestroySubscriptions } from '@app/shared/classes';
import { PreBookingDialogComponent } from './components';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
  providers: [DatePipe, AsyncPipe, TitleCasePipe, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductComponent extends DestroySubscriptions implements OnInit {
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
    private userService: UserManagementService,
    private translateService: TranslateService,
    private dialogService: DialogService
  ) {
    super();
  }

  ngOnInit(): void {
    this.product$ = this.activatedRoute.data.pipe(
      map((res: Data) => res.product),
      shareReplay()
    );
    this.form = this.fb.group({
      startDate: this.datePipe.transform(new Date(), 'YYYY-MM-dd'),
      datesSelected: []
    });
  }

  public onClickSlot(index: number, value: IBookingSlot): void {
    if (this.selectedSlots.has(index)) {
      this.selectedSlots.delete(index);
      return;
    }
    this.selectedSlots.set(index, value);
  }

  public onSubmit(): void {
    if (!this.userService.isLoggedIn) {
      this.dialogService.open(PreBookingDialogComponent, {
        datesSelected: this.selectedSlots
      }).afterClosed.pipe(
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
