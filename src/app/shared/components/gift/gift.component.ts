import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { IGiftSlot, IProduct } from '../../interfaces';


@Component({
  selector: 'app-gift',
  templateUrl: './gift.component.html',
  styleUrls: ['./gift.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GiftComponent {

  @Input() gift: IProduct;
  @Input() currentlyClicked = false;
  @Output() clickGift: EventEmitter<IProduct> = new EventEmitter();
  @Output() addGift: EventEmitter<IGiftSlot> = new EventEmitter();

  public currentQty = 0;

  public onGiftClick(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    this.clickGift.emit(this.gift);
  }

  public onAddClick(): void {
    this.addGift.emit({ id: this.gift.id, qty: this.currentQty });
  }

}
