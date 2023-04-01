import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-landing-section',
  templateUrl: './landing-section.component.html',
  styleUrls: ['./landing-section.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LandingSectionComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
