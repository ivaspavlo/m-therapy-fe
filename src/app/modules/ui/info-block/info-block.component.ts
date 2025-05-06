import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-info-block',
  templateUrl: './info-block.component.html',
  styleUrls: ['./info-block.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InfoBlockComponent {
  @Input() iconName: string = '';
  @Input() buttonTitle: string = '';
  @Input() buttonUrl: string | null = null;

  @Output() buttonClick: EventEmitter<void> = new EventEmitter();

  public onButtonClick(): void {
    this.buttonClick.emit();
  }
}
