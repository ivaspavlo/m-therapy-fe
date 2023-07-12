import { DOCUMENT } from '@angular/common';
import { Component, OnInit, ChangeDetectionStrategy, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FooterComponent implements OnInit {

  public formGroup!: FormGroup;
  public controlName: string = 'newsletter';
  public currentYear: string = '';

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private readonly fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      [this.controlName]: this.fb.control('')
    });
    this.currentYear = `${new Date().getFullYear()}`;
  }

  public onClickBrand(): void {
    this.document.body.scrollTo({ top: 0, behavior: 'smooth' });
  }

}
