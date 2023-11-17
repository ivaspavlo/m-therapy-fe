import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';


@Component({
  selector: 'app-primary-button',
  templateUrl: './primary-button.component.html',
  styleUrls: ['./primary-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PrimaryButtonComponent {
  @Input() title: string = '';
  @Input() disabled: boolean = false;
  @Input() url: string | null = null;
  @Input() isLoading: boolean = false;

  @Output() buttonClick: EventEmitter<MouseEvent> = new EventEmitter();

  public onClick(event: MouseEvent): void {
    event.preventDefault();
    event.stopPropagation();
    if (this.isLoading) {
      return;
    }
    this.buttonClick.emit(event);
  }
}
