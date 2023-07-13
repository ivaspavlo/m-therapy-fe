import { Component, OnInit, Input, Optional, ChangeDetectionStrategy, EventEmitter, Output } from '@angular/core';
import { ControlContainer, FormControl, FormGroup } from '@angular/forms';
import { INPUT_TYPES } from '@app/core/constants';


@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputComponent implements OnInit {

  @Output() inputSubmit: EventEmitter<void> = new EventEmitter();

  @Input() controlName!: string;
  @Input() label: string = '';
  @Input() plh: string = '';
  @Input() type: INPUT_TYPES = INPUT_TYPES.TEXT;

  public get isTextArea() { return this.type === INPUT_TYPES.TEXTAREA; }
  public get isStandalone() { return this.type === INPUT_TYPES.STANDALONE; }
  public get form(): FormGroup { return this.controlContainer.control as FormGroup; }
  public get control(): FormControl { return this.form.get(this.controlName) as FormControl; }

  public hasFocus: boolean = false;

  constructor(
    @Optional() private controlContainer: ControlContainer
  ) { }

  ngOnInit(): void {
    this.initInnerInputType();
  }

  public onFocus(): void {
    this.hasFocus = true;
  }

  public onBlur(): void {
    this.hasFocus = false;
  }

  public onPasswordToggle(isHidden: boolean): void {
    this.type = isHidden ? INPUT_TYPES.PASSWORD : INPUT_TYPES.TEXT;
  }

  private initInnerInputType(): void {
    this.type = !this.type ? INPUT_TYPES.TEXT : this.type;
  }

}
