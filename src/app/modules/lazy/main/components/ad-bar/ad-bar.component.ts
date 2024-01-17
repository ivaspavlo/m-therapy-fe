import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { AdType, IAd } from '@app/interfaces';


@Component({
  selector: 'app-ad-bar',
  templateUrl: './ad-bar.component.html',
  styleUrls: ['./ad-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdBarComponent {
  @Input() link: string | null = null;
  @Input() set ads(value: IAd[] | null) {
    if (!Array.isArray(value)) {
      return;
    }
    this.ad = value.find(ad => ad.type === AdType.COUNTDOWN);
  };
  public ad?: IAd;
  public isVisible: boolean = true;

  public onClose(): void {
    this.isVisible = false;
  }
}
