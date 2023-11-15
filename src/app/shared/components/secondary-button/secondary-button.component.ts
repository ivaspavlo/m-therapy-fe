import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';


@Component({
  selector: 'app-secondary-button',
  templateUrl: './secondary-button.component.html',
  styleUrls: ['./secondary-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SecondaryButtonComponent {
  @Input() title: string = '';
  @Input() disabled: boolean = false;
  @Input() url: string | null = null;
  @Input() isLoading: boolean = false;

  @Output() buttonClick: EventEmitter<void> = new EventEmitter();

  public onClick(event: MouseEvent): void {
    event.preventDefault();
    event.stopPropagation();
    if (this.isLoading) {
      return;
    }
    this.buttonClick.emit();
  }
}
