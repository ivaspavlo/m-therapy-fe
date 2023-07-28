import { ChangeDetectionStrategy, Component, Input, Optional, ViewChild } from '@angular/core';
import { ControlContainer, FormControl, FormGroup } from '@angular/forms';
import { FormErrors } from '@app/core/constants';
import { AngularMyDatePickerDirective, IAngularMyDpOptions, IMyDateModel } from 'angular-mydatepicker';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker-container.component.html',
  styleUrls: ['./date-picker-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DatePickerContainerComponent {

  @ViewChild('dp') mydp!: AngularMyDatePickerDirective;

  @Input() controlName!: string;
  @Input() plh = 'Please select the date';
  @Input() label = 'test';
  @Input() errorsMap: { [key:string]: string; } = FormErrors;
  @Input() dpOptions: IAngularMyDpOptions = {
    dateRange: false,
    dateFormat: 'dd.mm.yyyy'
  };

  public isCalendarVisible$!: Observable<boolean>;
  public model: IMyDateModel | null = null;
  public get form(): FormGroup { return this.controlContainer?.control as FormGroup; }
  public get control(): FormControl { return this.form?.get(this.controlName) as FormControl; }

  constructor(
    @Optional() private controlContainer: ControlContainer
  ) { }

  ngAfterViewInit() {
    this.initCalendarVisibleObservable();
  }

  public onDateChanged(event: IMyDateModel): void {
    const value = this.dpOptions.dateRange
      ? { begin: event.dateRange?.beginJsDate, end: event.dateRange?.endJsDate }
      : event.singleDate?.jsDate;
    this.control.markAsDirty();
    this.control.patchValue(value);
  }

  public onToggleCalendar(): void {
    this.mydp.toggleCalendar();
  }

  public onClearDate(): void {
    this.mydp.clearDate();
  }

  public onBlur(): void {
    this.control.markAsTouched();
  }

  private initCalendarVisibleObservable(): void {
    this.isCalendarVisible$ = this.mydp.calendarToggle.pipe(
      map((res: number) => res === 1)
    );
  }
}
