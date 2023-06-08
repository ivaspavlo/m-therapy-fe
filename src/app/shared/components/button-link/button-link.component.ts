import { ChangeDetectionStrategy, Component, Input } from '@angular/core';


@Component({
  selector: 'app-button-link',
  templateUrl: './button-link.component.html',
  styleUrls: ['./button-link.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonLinkComponent {

  @Input() title: string = '';
  @Input() direction: 'top' | 'bottom' | 'left' | 'right' = 'right';

}
