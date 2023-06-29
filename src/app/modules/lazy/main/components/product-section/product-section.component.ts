import { ChangeDetectionStrategy, Component, Input } from '@angular/core';


interface IProduct {
  id: string,
  title: string,
  price: number,
  img: string
}

@Component({
  selector: 'app-product-section',
  templateUrl: './product-section.component.html',
  styleUrls: ['./product-section.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductSectionComponent {

  @Input() products: IProduct[] = [
    { id: '1', title: 'products.swedish', price: 500, img: '/assets/images/graphic/test.png' },
    { id: '2', title: 'products.facial-scrubs', price: 600, img: '/assets/images/graphic/test.png' },
    { id: '3', title: 'products.body-scrubs', price: 700, img: '/assets/images/graphic/test.png' },
    { id: '4', title: 'products.body-scrubs', price: 700, img: '/assets/images/graphic/test.png' },
    { id: '5', title: 'products.body-scrubs', price: 700, img: '/assets/images/graphic/test.png' },
    { id: '6', title: 'products.body-scrubs', price: 700, img: '/assets/images/graphic/test.png' },
    { id: '7', title: 'products.body-scrubs', price: 700, img: '/assets/images/graphic/test.png' }
  ];

  public displayLimit: number = 3;

  constructor() {}

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
