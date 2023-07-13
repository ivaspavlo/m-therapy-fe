import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { INPUT_TYPES } from '@app/core/constants';


@Component({
  selector: 'app-input-icon',
  templateUrl: './input-icon.component.html',
  styleUrls: ['./input-icon.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputIconComponent implements OnInit {
  
  @Input() type!: INPUT_TYPES;
  @Output() togglePasswordVisibility: EventEmitter<boolean> = new EventEmitter();
  
  public isPassword = false;
  public isPasswordHidden = true;

  constructor() { }

  ngOnInit(): void {
    this.isPassword = this.type === INPUT_TYPES.PASSWORD;
  }
  
  public onClick(): void {
    if (this.isPassword) {
      this.isPasswordHidden = !this.isPasswordHidden;
      this.togglePasswordVisibility.emit(this.isPasswordHidden);
    }
  }

}
