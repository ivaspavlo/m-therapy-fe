import { DOCUMENT } from '@angular/common';
import { AfterContentInit, ChangeDetectionStrategy, Component, ContentChildren, ElementRef, Inject, QueryList } from '@angular/core';
import { fromEvent } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DestroySubscriptions } from '@app/shared/classes';


@Component({
  selector: 'app-header-mobile-menu',
  templateUrl: './header-mobile-menu.component.html',
  styleUrls: ['./header-mobile-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderMobileMenuComponent extends DestroySubscriptions implements AfterContentInit  {

  @ContentChildren('headerMobileMenuItem', {descendants: true}) details!: QueryList<ElementRef>;
  private items: HTMLElement[] = [];
  private currentItem: HTMLElement | null = null;
  private keyUpCode: number = 38;
  private keyDownCode: number = 40;

  constructor(
    @Inject(DOCUMENT) private document: Document
  ) {
    super();
  }

  ngAfterContentInit(): void {
    this.items = this.details.toArray().map(e => e.nativeElement);
    if (this.items.length) {
      this.listenToArrowKeysClick();
    }
  }

  private listenToArrowKeysClick(): void {
    fromEvent(this.document.documentElement, 'keydown').pipe(
      takeUntil(this.componentDestroyed$)
    ).subscribe((event: any) => {
      if (event.keyCode === this.keyUpCode) {
        return this.onKeyUp();
      }
      if (event.keyCode === this.keyDownCode) {
        return this.onKeyDown();
      }
    });
  }

  private onKeyUp(): void {
    if (!this.currentItem || this.items.indexOf(this.currentItem) === 0) {
      this.currentItem = this.items[this.items.length - 1];
      this.currentItem.focus();
      return;
    }
    
  }

  private onKeyDown(): void {

  }

}
