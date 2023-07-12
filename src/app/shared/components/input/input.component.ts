import { Component, OnInit, Input, Optional, ChangeDetectionStrategy, EventEmitter, Output } from '@angular/core';
import { ControlContainer, FormControl, FormGroup } from '@angular/forms';


export type InputTypes = 'text' | 'number' | 'textarea' | 'password' | 'email' | 'phone';

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
  @Input() type: InputTypes = 'text';
  @Input() hasSubmitButton: boolean = false;

  public get isTextArea() { return this.innerInputType === 'textarea'; }
  public get form(): FormGroup { return this.controlContainer.control as FormGroup; }
  public get control(): FormControl {
    debugger;
    return this.form.get(this.controlName) as FormControl;
  }

  public innerInputType!: InputTypes;
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
    this.innerInputType = isHidden ? 'password' : 'text';
  }

  private initInnerInputType(): void {
    this.innerInputType = !this.type ? 'text' : this.type;
  }

}
