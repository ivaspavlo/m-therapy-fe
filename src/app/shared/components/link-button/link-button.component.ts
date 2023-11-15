import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';


@Component({
  selector: 'app-link-button',
  templateUrl: './link-button.component.html',
  styleUrls: ['./link-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LinkButtonComponent {
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
