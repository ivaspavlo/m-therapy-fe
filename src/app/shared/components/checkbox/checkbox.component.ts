import { Component, ChangeDetectionStrategy, Input, Optional } from '@angular/core';
import { ControlContainer, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CheckboxComponent {
  @Input() label: string = '';
  @Input() controlName!: string;
  @Input() hasErrors = false;

  public get form(): FormGroup { return this.controlContainer.control as FormGroup; }
  public get control(): FormControl { return this.form.get(this.controlName) as FormControl; }

  constructor(
    @Optional() private controlContainer: ControlContainer
  ) { }
}
