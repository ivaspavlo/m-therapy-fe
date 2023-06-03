import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormControl } from '@angular/forms';


@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FooterComponent implements OnInit {

  public newsletterControl: FormControl = new FormControl('');
  public currentYear: string = '';

  constructor() { }

  ngOnInit(): void {
    this.currentYear = `${new Date().getFullYear()}`;
  }

  public onClickBrand(): void {
    console.log('test');
  }

}
