import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { IHeaderControl } from '@app/interfaces/header-control.interface';
import { BehaviorSubject } from 'rxjs';


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

  public onClickMenuItem(menuItem: IHeaderControl, event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    const anchorElement: HTMLElement = event.target as HTMLElement;
    anchorElement.blur();

    this.isMenuVisible$.next(false);
    this.clickMenuItem.emit(menuItem);
  }
}
