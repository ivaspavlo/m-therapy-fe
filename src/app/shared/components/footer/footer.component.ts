import { DOCUMENT } from '@angular/common';
import { Component, OnInit, ChangeDetectionStrategy, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { INPUT_TYPES } from '@app/core/constants';
import { DialogService } from '@app/modules/ui/dialog';
import { takeUntil } from 'rxjs/operators';


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
  public INPUT_TYPES = INPUT_TYPES;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private readonly fb: FormBuilder,
    private dialogService: DialogService
  ) { }

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      [this.controlName]: this.fb.control('', [Validators.required, Validators.email])
    });
    this.currentYear = `${new Date().getFullYear()}`;
  }

  public onClickBrand(): void {
    this.document.body.scrollTo({ top: 0, behavior: 'smooth' });
  }

  public onShowTeamModal(): void {
    const dialogConfig = {
      test: 'TEST'
    };
    // this.dialogService.open(TestModalComponent, dialogConfig).afterClosed.pipe(
    //   takeUntil(this.componentDestroyed$)
    // ).subscribe(() => {
    //   console.log('works');
    // });
  }

  public onShowUpdates(): void { }

  public onShowCertificates(): void { }

}
