import { Component, Input, Optional, ViewChild } from '@angular/core';
import { ControlContainer, FormControl, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import { AngularMyDatePickerDirective, IAngularMyDpOptions, IMyDateModel } from 'angular-mydatepicker';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker-container.component.html',
  styleUrls: ['./date-picker-container.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: DatePickerContainerComponent,
    multi: true
  }]
})
export class DatePickerContainerComponent {
  
  @ViewChild('dp') mydp: AngularMyDatePickerDirective;

  @Input() dpOptions: IAngularMyDpOptions = {
    dateRange: false,
    dateFormat: 'dd.mm.yyyy'
  };
  @Input() placeholder = 'Please select the date';
  @Input() label = 'test';
  @Input() errorsMap: { [key:string]: string; };
  @Input() controlName = '';
  
  public isCalendarVisible$: Observable<boolean>;
  
  // ControlValueAccessor
  
  private onChange;
  private onTouched;
  
  // ControlContainer
  
  public get form(): FormGroup { return this.controlContainer?.control as FormGroup; }
  public get control(): FormControl { return this.form?.get(this.controlName) as FormControl; }
  
  public model: IMyDateModel = null;

  constructor(
    @Optional() private controlContainer: ControlContainer
  ) { }
  
  ngAfterViewInit() {
    this.initCalendarVisibleObservable();
  }
  
  // ControlValueAccessor
  
  public registerOnChange(fn): void {
    this.onChange = fn;
  }
  public registerOnTouched(fn): void {
    this.onTouched = fn;
  }
  public writeValue(value: string): void {
    if (!value) {
      return;
    }
    this.model = {
      isRange: this.dpOptions.dateRange,
      singleDate: {
        jsDate: new Date(value)
      }
    }
  }
  
  // Public methods
  
  public onDateChanged(event: IMyDateModel): void {
    const value = this.dpOptions.dateRange ?
      { begin: event.dateRange.beginJsDate, end: event.dateRange.endJsDate } :
      event.singleDate.jsDate;
    this.onChange(value);
  }
  
  public onInputClick(): void {
    this.onTouched();
    this.mydp.toggleCalendar();
  }
  
  public onClearDate(): void {
    this.mydp.clearDate();
  }
  
  // PRIVATE METHODS
  
  private initCalendarVisibleObservable(): void {
    this.isCalendarVisible$ = this.mydp.calendarToggle.pipe(
      map((res: number) => res === 1)
    );
  }

}
