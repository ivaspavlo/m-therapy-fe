import { Component, ChangeDetectionStrategy, Input, Optional } from '@angular/core';
import { ControlContainer, FormControl, FormGroup } from '@angular/forms';
import { ISelectOption } from '../../interfaces';


@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectComponent {

  @Input() options: ISelectOption[] = [];
  @Input() controlName = '';
  @Input() label = '';

  public get form(): FormGroup {
    return this.controlContainer.control as FormGroup;
  }
  public get control(): FormControl {
    return this.form.get(this.controlName) as FormControl;
  }

  constructor(
    @Optional() private controlContainer: ControlContainer
  ) { }

}
