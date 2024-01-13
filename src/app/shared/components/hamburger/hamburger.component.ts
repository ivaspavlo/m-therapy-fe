import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter, Inject } from '@angular/core';
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
export class HamburgerComponent extends DestroySubscriptions {

  @Input() set isOn(value: boolean) {
    this._isOn = value;
  };
  @Output() toggle: EventEmitter<boolean> = new EventEmitter();

  public _isOn: boolean = false;

  constructor(
    @Inject(DOCUMENT) private document: Document
  ) {
    super();
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
    this.toggle.emit(this._isOn);
  }

  ngOnDestroy() {
    this.componentDestroyed$.next();
    this.componentDestroyed$.unsubscribe();
  }

}
