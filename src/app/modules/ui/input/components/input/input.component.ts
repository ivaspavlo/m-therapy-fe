import { Component, OnInit, Input, Optional, ChangeDetectionStrategy } from '@angular/core';
import { ControlContainer, FormControl, FormGroup } from '@angular/forms';
import { InputTypes } from '../../interfaces';


@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputComponent implements OnInit {

  @Input() controlName!: string;
  @Input() label: string = '';
  @Input() plh: string = '';
  @Input() type: InputTypes = 'text';

  public get isTextArea() { return this.innerInputType === 'textarea'; }
  public get form(): FormGroup { return this.controlContainer.control as FormGroup; }
  public get control(): FormControl { return this.form.get(this.controlName) as FormControl; }

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
