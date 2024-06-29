import { ChangeDetectionStrategy, Component, Input, Optional } from '@angular/core';
import { ControlContainer, FormControl, FormGroup } from '@angular/forms';
import { FormErrors } from '@app/core/constants';


@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker-container.component.html',
  styleUrls: ['./date-picker-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DatePickerContainerComponent {
  @Input() controlName!: string;
  @Input() plh = '';
  @Input() label = '';
  @Input() errorsMap: {[key:string]: string} = FormErrors;

  public get form(): FormGroup { return this.controlContainer?.control as FormGroup; }
  public get control(): FormControl { return this.form?.get(this.controlName) as FormControl; }

  constructor(
    @Optional() private controlContainer: ControlContainer
  ) { }

  public onClearDate(): void {
    this.control.reset();
  }
}
