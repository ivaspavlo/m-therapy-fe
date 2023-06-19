import { DecimalPipe, FormStyle, TranslationWidth, getLocaleMonthNames } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Inject, Input, LOCALE_ID, NgZone, Renderer2, ViewChild } from '@angular/core';


@Component({
  selector: 'app-ad-countdown',
  templateUrl: './ad-countdown.component.html',
  styleUrls: ['./ad-countdown.component.scss'],
  providers: [ DecimalPipe ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdCountdownComponent implements AfterViewInit {

  @ViewChild('daysEl', { read: ElementRef, static: true }) daysEl: ElementRef;
  @ViewChild('hoursEl', { read: ElementRef, static: true }) hoursEl: ElementRef;
  @ViewChild('minutesEl', { read: ElementRef, static: true }) minutesEl: ElementRef;
  @ViewChild('secondsEl', { read: ElementRef, static: true }) secondsEl: ElementRef;

  @Input('targetDate') targetDate: Date = new Date(2023, 6, 11);
  @Input('isTargeDateVisible') isTargeDateVisible: boolean = false;

  public isSpinnerVisible: boolean = true;

  public currentTime: string = '';
  public targetTimeString: string = '';

  private targetTime: number = this.targetDate.getTime();
  private date: Date;
  private now: number;
  private difference: number;
  private months: ReadonlyArray<string>;

  constructor(
    @Inject(LOCALE_ID) public locale: string,
    private zone: NgZone,
    private renderer: Renderer2,
    private cdr: ChangeDetectorRef,
    private decimalPipe: DecimalPipe
  ) { }

  ngOnInit() {
    this.months = getLocaleMonthNames(this.locale, FormStyle.Standalone, TranslationWidth.Wide);
    this.targetTimeString = `${this.months[this.targetDate.getMonth()]} ${this.targetDate.getDate()}, ${this.targetDate.getFullYear()}`;
  }

  ngAfterViewInit() {
    this.zone.runOutsideAngular(() => {
      setInterval(() => {
        this.difference = this.targetTime - this.now;
        this.difference = this.difference / (1000 * 60 * 60 * 24);
        this.tickTock();
      }, 1000);
    });
  }

  private tickTock() {

    this.date = new Date();
    this.now = this.date.getTime();

    if (this.isSpinnerVisible) {
      this.isSpinnerVisible = typeof Math.floor(this.difference) !== 'number';
      this.cdr.detectChanges();
      return;
    }

    this.renderer.setProperty(this.daysEl.nativeElement, 'innerHTML', this.decimalPipe.transform(Math.floor(this.difference), '2.0'));
    this.renderer.setProperty(this.hoursEl.nativeElement, 'innerHTML', this.decimalPipe.transform(60 - this.date.getMinutes(), '2.0'));
    this.renderer.setProperty(this.minutesEl.nativeElement, 'innerHTML', this.decimalPipe.transform(60 - this.date.getMinutes(), '2.0'));
    this.renderer.setProperty(this.secondsEl.nativeElement, 'innerHTML', this.decimalPipe.transform(60 - this.date.getSeconds(), '2.0'));
  }

}
