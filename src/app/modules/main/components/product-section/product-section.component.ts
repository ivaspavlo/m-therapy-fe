import { ChangeDetectionStrategy, Component } from '@angular/core';


@Component({
  selector: 'app-product-section',
  templateUrl: './product-section.component.html',
  styleUrls: ['./product-section.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductSectionComponent {

  public products = [
    { id: '1', title: 'products.swedish', price: 500, img: '/assets/images/graphic/test.png' },
    { id: '2', title: 'products.facial-scrubs', price: 600, img: '/assets/images/graphic/test.png' },
    { id: '3', title: 'products.body-scrubs', price: 700, img: '/assets/images/graphic/test.png' },
    { id: '4', title: 'products.body-scrubs', price: 700, img: '/assets/images/graphic/test.png' }
  ];

  constructor() {}

}
