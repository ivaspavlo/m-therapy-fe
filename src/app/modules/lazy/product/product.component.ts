import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductComponent implements OnInit {

  constructor(
    private router: Router
  ) {}

  ngOnInit(): void {
    console.log(this.router.getCurrentNavigation());
  }

  public onSelectSlot(): void {
    console.log('works');
  }
}
