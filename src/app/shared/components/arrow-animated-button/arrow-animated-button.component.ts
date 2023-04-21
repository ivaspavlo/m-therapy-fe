
import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { Direction } from '../interfaces';


@Component({
  selector: 'app-arrow-animated-button',
  templateUrl: './arrow-animated-button.component.html',
  styleUrls: ['./arrow-animated-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ArrowAnimatedButtonComponent implements OnInit {
  
  @Input() direction: Direction = 'right';

  constructor() { }

  ngOnInit(): void { }

}
