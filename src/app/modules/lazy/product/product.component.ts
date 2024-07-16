import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AsyncPipe, DatePipe, TitleCasePipe } from '@angular/common';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { IBookingSlot, IProductBooking } from '@app/interfaces';
import { CORE_ROUTE_NAMES } from '@app/core/constants';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
  providers: [DatePipe, AsyncPipe, TitleCasePipe, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductComponent implements OnInit {

  public product$!: Observable<IProductBooking | null>;
  public form!: FormGroup;
  public CoreRouteNames = CORE_ROUTE_NAMES;
  public selectedSlots = new Map();

  constructor(
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.product$ = this.activatedRoute.data.pipe(
      map((res: Data) => res.data),
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
    
  }
}
