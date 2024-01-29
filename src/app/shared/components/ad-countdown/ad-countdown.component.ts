import { DecimalPipe, FormStyle, TranslationWidth, getLocaleMonthNames } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Inject, Input, LOCALE_ID, NgZone, OnDestroy, Renderer2, ViewChild } from '@angular/core';


@Component({
  selector: 'app-ad-countdown',
  templateUrl: './ad-countdown.component.html',
  styleUrls: ['./ad-countdown.component.scss'],
  providers: [ DecimalPipe ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdCountdownComponent implements OnDestroy {

  @Input('targetDate') set targetDate(value: number | undefined) {
    if (!value || typeof value !== 'number') {
      return;
    }
    this.stop();
    this.setUp(value);
    this.start();
  };
  @Input('isTargeDateVisible') isTargeDateVisible: boolean = false;

  @ViewChild('daysEl', { read: ElementRef, static: true }) daysEl!: ElementRef;
  @ViewChild('hoursEl', { read: ElementRef, static: true }) hoursEl!: ElementRef;
  @ViewChild('minutesEl', { read: ElementRef, static: true }) minutesEl!: ElementRef;
  @ViewChild('secondsEl', { read: ElementRef, static: true }) secondsEl!: ElementRef;

  public _targetDate?: Date;
  public isSpinnerVisible: boolean = true;
  public currentTime: string = '';
  public targetTimeString: string = '';

  private targetTime!: number;
  private date!: Date;
  private now!: number;
  private difference!: number;
  private months!: ReadonlyArray<string>;
  private interval!: any;

  constructor(
    @Inject(LOCALE_ID) public locale: string,
    private zone: NgZone,
    private renderer: Renderer2,
    private cdr: ChangeDetectorRef,
    private decimalPipe: DecimalPipe
  ) { }

  private setUp(value: number): void {
    this._targetDate = this.getTargetDate(value);
    if (!this._targetDate) {
      return;
    }
    this.targetTime = this._targetDate.getTime();
    this.months = getLocaleMonthNames(this.locale, FormStyle.Standalone, TranslationWidth.Wide);
    this.targetTimeString = `${this.months[this._targetDate.getMonth()]} ${this._targetDate.getDate()}, ${this._targetDate.getFullYear()}`;
  }

  private start(): void {
    if (!this._targetDate) {
      return;
    }
    this.zone.runOutsideAngular(() => this.interval = setInterval(() => this.tickTock(), 1000));
  }

  private stop(): void {
    clearInterval(this.interval);
  }

  private tickTock() {
    this.difference = (this.targetTime - this.now) / (1000 * 60 * 60 * 24);
    this.date = new Date();
    this.now = this.date.getTime();

    const days = Math.floor(this.difference);

    if (this.isSpinnerVisible) {
      this.isSpinnerVisible = isNaN(days) || typeof days !== 'number';
      this.cdr.detectChanges();
    }

    this.renderer.setProperty(this.daysEl.nativeElement, 'innerHTML', this.decimalPipe.transform(days, '2.0'));
    this.renderer.setProperty(this.hoursEl.nativeElement, 'innerHTML', this.decimalPipe.transform(60 - this.date.getMinutes(), '2.0'));
    this.renderer.setProperty(this.minutesEl.nativeElement, 'innerHTML', this.decimalPipe.transform(60 - this.date.getMinutes(), '2.0'));
    this.renderer.setProperty(this.secondsEl.nativeElement, 'innerHTML', this.decimalPipe.transform(60 - this.date.getSeconds(), '2.0'));
  }

  private getTargetDate(value: number): Date {
    const targetDate = new Date(value);
    targetDate.setMonth(targetDate.getMonth() + 1);
    return targetDate;
  }

  ngOnDestroy(): void {
    this.stop();
  }
}
