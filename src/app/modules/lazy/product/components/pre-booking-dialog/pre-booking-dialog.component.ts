import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DialogConfig, DialogRef } from '@app/modules/ui';
import { INPUT_TYPES } from '@app/core/constants';
import { IBookingSlot } from '@app/interfaces';

@Component({
  selector: 'app-pre-booking-dialog',
  templateUrl: './pre-booking-dialog.component.html',
  styleUrls: ['./pre-booking-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PreBookingDialogComponent implements OnInit {
  public INPUT_TYPES = INPUT_TYPES;
  public controlName: string = 'email';
  public formGroup!: FormGroup;
  public noRegistering: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private dialog: DialogRef,
    private config: DialogConfig<{ datesSelected: IBookingSlot[], price: number }>
  ) {}

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      [this.controlName]: this.fb.control('', [Validators.required, Validators.email]),
      datesSelected: this.config.data.datesSelected
    });
  }

  public goWithoutRegistering(): void {
    this.noRegistering = !this.noRegistering;
  }

  public onRegister(): void {
    this.router.navigateByUrl('/auth/register');
    this.dialog.close();
  }

  public onFileChange(value: any): void {
    console.log(value);
  }
}
