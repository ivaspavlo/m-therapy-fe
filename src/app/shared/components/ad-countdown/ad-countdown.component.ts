import { FormStyle, TranslationWidth, getLocaleMonthNames } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, Input, LOCALE_ID } from '@angular/core';


@Component({
  selector: 'app-ad-countdown',
  templateUrl: './ad-countdown.component.html',
  styleUrls: ['./ad-countdown.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdCountdownComponent implements AfterViewInit {

  @Input('targetDate') targetDate: Date = new Date(2023, 6, 11);
  @Input('isTargeDateVisible') isTargeDateVisible: boolean = false;

  public currentTime: string = '';
  public days: number;
  public hours: number;
  public minutes: number;
  public seconds: number;
  public targetTimeString: string = '';

  private targetTime: number = this.targetDate.getTime();
  private date: Date;
  private now: number;
  private difference: number;
  private months: ReadonlyArray<string>;

  constructor(
    @Inject(LOCALE_ID) public locale: string,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.months = getLocaleMonthNames(this.locale, FormStyle.Standalone, TranslationWidth.Wide);
    this.targetTimeString = `${this.months[this.targetDate.getMonth()]} ${this.targetDate.getDate()}, ${this.targetDate.getFullYear()}`;
  }

  ngAfterViewInit() {
    setInterval(() => {
      this.tickTock();
      this.difference = this.targetTime - this.now;
      this.difference = this.difference / (1000 * 60 * 60 * 24);
    }, 1000);
  }

  private tickTock() {
    this.date = new Date();
    this.now = this.date.getTime();
    this.days = Math.floor(this.difference);
    this.hours = 23 - this.date.getHours();
    this.minutes = 60 - this.date.getMinutes();
    this.seconds = 60 - this.date.getSeconds();
    this.cdr.markForCheck();
  }

}
