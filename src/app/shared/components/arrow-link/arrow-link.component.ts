import { ChangeDetectionStrategy, Component, Input } from '@angular/core';


@Component({
  selector: 'app-arrow-link',
  templateUrl: './arrow-link.component.html',
  styleUrls: ['./arrow-link.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ArrowLinkComponent {

  @Input() title: string = '';
  @Input() direction: 'top' | 'bottom' | 'left' | 'right' = 'right';

}
