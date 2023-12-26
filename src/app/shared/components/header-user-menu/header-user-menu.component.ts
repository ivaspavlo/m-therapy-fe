import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Component({
  selector: 'app-header-user-menu',
  templateUrl: './header-user-menu.component.html',
  styleUrls: ['./header-user-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderUserMenuComponent {
  @Input() items: string[] = ['item', 'item', 'item'];

  public isMenuVisible$ = new BehaviorSubject<boolean>(false);

  public onShowMenu(): void {
    if (this.isMenuVisible$.value) {
      return;
    }
    this.isMenuVisible$.next(true);
  }

  public onHideMenu(): void {
    if (!this.isMenuVisible$.value) {
      return;
    }
    this.isMenuVisible$.next(false);
  }

  public onToggleMenu(): void {
    this.isMenuVisible$.next(!this.isMenuVisible$.value);
  }
}
