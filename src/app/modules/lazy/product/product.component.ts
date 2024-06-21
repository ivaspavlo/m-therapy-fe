import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { IProductBooking } from '@app/interfaces';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductComponent implements OnInit {

  public product$!: Observable<IProductBooking | null>;

  constructor(
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // https://medium.com/@pottimo/4-ways-to-use-angular-local-variable-in-html-b87fe4918700
    this.product$ = this.activatedRoute.data.pipe(
      map((res: Data) => res.data),
      shareReplay()
    );
  }

  public onSelectSlot(): void {
    console.log('works');
  }
}
