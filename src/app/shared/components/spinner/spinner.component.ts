import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';


@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SpinnerComponent implements OnInit {

  @Input() size: 'xs' | 'sm' | 'md' | 'lg' = 'md';
  @Input() color: 'primary' | 'secondary' | 'default' = 'default';

  constructor( ) { }

  ngOnInit(): void { }

}
