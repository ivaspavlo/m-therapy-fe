import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ScrollTargetElements } from '@app/core/constants';


@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainPageComponent {
  public ScrollTargetElements = ScrollTargetElements;
}
