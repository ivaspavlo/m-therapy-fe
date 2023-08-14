import { Component, ChangeDetectionStrategy, Input, EventEmitter, Output } from '@angular/core';


@Component({
  selector: 'app-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LogoComponent {
  @Input() size: 'xs' | 'sm' | 'md' | 'lg' = 'md';
  @Input() routerLink: string | null = null;
  @Input() hasScrollTo = false;
  @Output() logoClick: EventEmitter<void> = new EventEmitter();

  public onClick(): void {
    this.logoClick.emit();
  }
}
