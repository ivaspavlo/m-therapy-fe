import { ChangeDetectionStrategy, Component, Input } from '@angular/core';


@Component({
  selector: 'app-ad-bar',
  templateUrl: './ad-bar.component.html',
  styleUrls: ['./ad-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdBarComponent {
  @Input() content: string = 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.';
  @Input() link: string | null = null;

  public isVisible: boolean = true;

  public onClose(): void {
    this.isVisible = false;
  }
}
