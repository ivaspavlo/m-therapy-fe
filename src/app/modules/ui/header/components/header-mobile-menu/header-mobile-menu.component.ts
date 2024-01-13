import { DOCUMENT } from '@angular/common';
import { AfterContentInit, ChangeDetectionStrategy, Component, ContentChildren, ElementRef, EventEmitter, Inject, Output, QueryList } from '@angular/core';
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
  @Output() close: EventEmitter<void> = new EventEmitter();

  private items: HTMLElement[] = [];
  private currentItem: HTMLElement | null = null;
  private keyUpCode: number = 38;
  private keyDownCode: number = 40;
  private escCode: number = 27;

  constructor(
    @Inject(DOCUMENT) private document: Document
  ) {
    super();
  }

  ngAfterContentInit(): void {
    this.items = this.details.toArray().map(e => e.nativeElement);
    if (this.items.length) {
      this.listenToKeyDown();
    }
  }

  private listenToKeyDown(): void {
    fromEvent(this.document.documentElement, 'keydown').pipe(
      takeUntil(this.componentDestroyed$)
    ).subscribe((event: any) => {
      if (event.keyCode === this.keyUpCode) {
        return this.onKeyUp();
      }
      if (event.keyCode === this.keyDownCode) {
        return this.onKeyDown();
      }
      if (event.keyCode === this.escCode) {
        return this.onEsc();
      }
    });
  }

  private onKeyUp(): void {
    if (!this.currentItem) {
      this.currentItem = this.items[this.items.length - 1];
      this.currentItem.focus();
      return;
    }
    if (this.items.length === 1) {
      return;
    }
    const currentIndex = this.items.indexOf(this.currentItem);
    const isFirst = currentIndex === 0;
    if (isFirst) {
      this.currentItem = this.items[this.items.length - 1];
      this.currentItem.focus();
      return;
    }
    this.currentItem = this.items[currentIndex - 1];
    this.currentItem.focus();
  }

  private onKeyDown(): void {
    if (!this.currentItem) {
      this.currentItem = this.items[0];
      this.currentItem.focus();
      return;
    }
    if (this.items.length === 1) {
      return;
    }
    const currentIndex = this.items.indexOf(this.currentItem);
    const isLast = currentIndex === this.items.length - 1;
    if (isLast) {
      this.currentItem = this.items[0];
      this.currentItem.focus();
      return;
    }
    this.currentItem = this.items[currentIndex + 1];
    this.currentItem.focus();
  }

  private onEsc(): void {
    this.close.emit();
  }

}
