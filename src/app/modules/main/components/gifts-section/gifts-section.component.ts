import { ChangeDetectionStrategy, Component } from '@angular/core';


@Component({
  selector: 'app-gifts-section',
  templateUrl: './gifts-section.component.html',
  styleUrls: ['./gifts-section.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GiftsSectionComponent {

}
