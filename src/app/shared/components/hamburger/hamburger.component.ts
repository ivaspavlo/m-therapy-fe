import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { fromEvent } from 'rxjs';
import { first, takeUntil } from 'rxjs/operators';
import { DestroySubscriptions } from '@app/shared/classes';


@Component({
  selector: 'app-hamburger',
  templateUrl: './hamburger.component.html',
  styleUrls: ['./hamburger.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HamburgerComponent extends DestroySubscriptions implements OnInit {

  @Input() init: boolean = false;
  @Output() isOn: EventEmitter<boolean> = new EventEmitter();

  public _isOn!: boolean;

  constructor(
    @Inject(DOCUMENT) private document: Document
  ) {
    super();
  }

  ngOnInit(): void {
    this._isOn = this.init || false;
  }

  public onBtnClick(event: MouseEvent): void {
    this.switchStateAndEmit(event);
    if (this._isOn) {
      this.listenToOuterClick();
    }
  }

  private listenToOuterClick(): void {
    fromEvent(this.document, 'click').pipe(
      first(),
      takeUntil(this.componentDestroyed$)
    ).subscribe((event: any) => {
      if (this._isOn) {
        this.switchStateAndEmit(event);
      }
    });
  }

  private switchStateAndEmit(event: MouseEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this._isOn = !this._isOn;
    this.isOn.emit(this._isOn);
  }

  ngOnDestroy() {
    this.componentDestroyed$.next();
    this.componentDestroyed$.unsubscribe();
  }

}
