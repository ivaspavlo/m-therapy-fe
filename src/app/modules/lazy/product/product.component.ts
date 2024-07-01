import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { IProductBooking } from '@app/interfaces';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
  providers: [DatePipe],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductComponent implements OnInit {

  public product$!: Observable<IProductBooking | null>;
  public form!: FormGroup;

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

  public onSelectSlot(): void {
    console.log('works');
  }
}
