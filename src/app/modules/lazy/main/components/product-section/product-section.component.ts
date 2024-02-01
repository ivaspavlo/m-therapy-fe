import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { IProduct, IResponse } from '@app/interfaces';
import { ProductApiService } from '@app/core/services';


@Component({
  selector: 'app-product-section',
  templateUrl: './product-section.component.html',
  styleUrls: ['./product-section.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductSectionComponent {

  @Input() products: IProduct[] = [];

  public displayLimit: number = 3;
  public products$!: Observable<IProduct[]>;

  constructor(
    private productService: ProductApiService
  ) { }

  ngOnInit() {
    this.products$ = this.productService.getProducts().pipe(
      catchError(() => of(null)),
      map((res: IResponse<IProduct[]> | null) => res ? res.data : [])
    );
  }

  public trackByProductId(index: number, product: IProduct): string {
    return product.id;
  }

  public onShowMore(): void {
    if (this.displayLimit > this.products.length) {
      return;
    }
    this.displayLimit = this.displayLimit + this.displayLimit;
  }

}
