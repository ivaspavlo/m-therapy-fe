import { Component, ChangeDetectionStrategy, Input, EventEmitter, Output } from '@angular/core';


@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonComponent {

  @Input() type: 'primary' | 'secondary' | '' = '';
  @Input() title: string = '';
  @Input() disabled: boolean = false;
  @Input() link: string = '';

  @Output() buttonClick: EventEmitter<void> = new EventEmitter();

}
