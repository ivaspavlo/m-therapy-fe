import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { BRAND_NAME, ScrollTargetElements } from '@app/core/constants';
import { ScrollService } from '@app/core/services/scroll.service';


@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BrandComponent {
  @Input() hasLogo: boolean = true;
  @Input() isClickable: boolean = true;
  @Input() size: 'xs' | 'sm' | 'md' = 'sm';

  @Output() brandClick: EventEmitter<void> = new EventEmitter();

  public brandName = BRAND_NAME;

  constructor(
    private scrollService: ScrollService
  ) { }

  public onClick(): void {
    this.scrollService.scrollToElement(ScrollTargetElements.LANDING_SECTION);
    this.brandClick.emit();
  }
}
