import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DialogConfig, DialogRef } from '@app/modules/ui';

@Component({
  selector: 'app-go-to-cart-dialog',
  templateUrl: './go-to-cart-dialog.component.html',
  styleUrls: ['./go-to-cart-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GoToCartDialogComponent {

  constructor(
    private config: DialogConfig<unknown>,
    private dialog: DialogRef
  ) {}

  public onStay(): void {
    this.dialog.close(false);
  }

  public onBookNow(): void {
    this.dialog.close(true);
  }
}
