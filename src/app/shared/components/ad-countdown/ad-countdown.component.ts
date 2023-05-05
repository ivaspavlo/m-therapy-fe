import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-ad-countdown',
  templateUrl: './ad-countdown.component.html',
  styleUrls: ['./ad-countdown.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdCountdownComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
