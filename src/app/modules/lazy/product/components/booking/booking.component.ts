import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IProductBooking } from '@app/interfaces';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss'],
  providers: [DatePipe],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookingComponent implements OnInit {
  @Input() product!: IProductBooking;
  public form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      startDate: this.datePipe.transform(new Date(), 'YYYY-MM-dd'),
      datesSelected: []
    });
  }
}
