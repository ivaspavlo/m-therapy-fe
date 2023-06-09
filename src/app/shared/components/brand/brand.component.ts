import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';


@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BrandComponent {

  @Input() hasLogo: boolean = true;
  @Input() isClickable: boolean = true;
  @Input() size: 'small' | 'medium' | 'large' = 'small';

  @Output() brandClick: EventEmitter<void> = new EventEmitter();

  public onClick(): void {
    this.brandClick.emit();
  }

}
