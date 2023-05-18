import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SpinnerComponent implements OnInit {

  @Input() size: 'xs' | 'sm' | 'md' | 'lg' = 'md';

  constructor(
    private spinnerService: NgxSpinnerService
  ) { }

  ngOnInit(): void { }

}
