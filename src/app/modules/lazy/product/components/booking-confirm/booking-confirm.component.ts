import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';
import { BookingApiService } from '@app/core/services';
import { IPreBooking } from '@app/interfaces';
import { DialogService } from '@app/modules/ui';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
// import { PreBookingDialogComponent } from '../pre-booking-dialog/pre-booking-dialog.component';

@Component({
  selector: 'app-booking-confirm',
  templateUrl: './booking-confirm.component.html',
  styleUrls: ['./booking-confirm.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookingConfirmComponent implements OnInit {
  public preBooking$!: Observable<IPreBooking>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private bookingApiService: BookingApiService,
    private dialogService: DialogService
  ) { }

  ngOnInit(): void {
    this.preBooking$ = this.activatedRoute.data.pipe(
      map((res: Data) => res.preBooking),
      shareReplay()
    );
    // console.log(PreBookingDialogComponent);
  }
}
