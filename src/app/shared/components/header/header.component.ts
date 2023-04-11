import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit {

  public headerControls = [
    { uiName: 'services', link: '' },
    { uiName: 'gifts', link: '' },
    { uiName: 'blog', link: '' }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
