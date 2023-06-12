import { ChangeDetectionStrategy, Component, Input } from '@angular/core';


@Component({
  selector: 'app-title-tag',
  templateUrl: './title-tag.component.html',
  styleUrls: ['./title-tag.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TitleTagComponent {

  @Input() title: string = ''

}
