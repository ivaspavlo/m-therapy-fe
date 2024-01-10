import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IHeaderControl } from '@app/interfaces';


@Component({
  selector: 'app-header-user-menu',
  templateUrl: './header-user-menu.component.html',
  styleUrls: ['./header-user-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderUserMenuComponent {
  @Input() items: IHeaderControl[] = [];
  @Output() clickMenuItem = new EventEmitter<IHeaderControl>();

  public isMenuVisible$ = new BehaviorSubject<boolean>(false);
  private isBlocked: boolean = false;

  public onShowMenu(): void {
    if (this.isBlocked || this.isMenuVisible$.value) {
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

  public onClickMenuItem(menuItem: IHeaderControl, event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    const anchorElement: HTMLElement = event.target as HTMLElement;
    anchorElement.blur();

    this.forceCloseMenu();
    this.clickMenuItem.emit(menuItem);
  }

  private forceCloseMenu(): void {
    this.onHideMenu();
    this.isBlocked = true;
    setTimeout(() => {this.isBlocked = false;}, 0);
  }
}
