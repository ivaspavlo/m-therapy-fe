import { ChangeDetectionStrategy, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DialogConfig, DialogRef } from '@app/modules/ui';
import { INPUT_TYPES } from '@app/core/constants';
import { IBookingSlot, IPaymentData } from '@app/interfaces';

import { AUTH_ROUTE_NAMES } from '@app/modules/lazy/auth/auth-routing.module';

@Component({
  selector: 'app-pre-booking-dialog',
  templateUrl: './pre-booking-dialog.component.html',
  styleUrls: ['./pre-booking-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PreBookingDialogComponent implements OnInit {
  @ViewChild('paymentFileInput') paymentFileInput!: ElementRef;

  public INPUT_TYPES = INPUT_TYPES;
  public controlName: string = 'email';
  public formGroup!: FormGroup;
  public noRegistering: boolean = false;
  public fileName: string = '';
  public fileHasError: boolean = false;

  private maxSize = 10 * 1024 * 1024; // 10MB in bytes
  private allowedFormats = ['application/pdf', 'image/jpeg', 'image/png'];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private dialog: DialogRef,
    public config: DialogConfig<{ datesSelected: IBookingSlot[], price: number, paymentData: IPaymentData }>
  ) {}

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      [this.controlName]: this.fb.control('', [Validators.required, Validators.email]),
      datesSelected: this.config.data.datesSelected,
      paymentFile: null
    });
  }

  public goWithoutRegistering(): void {
    this.noRegistering = !this.noRegistering;
  }

  public onRegister(): void {
    this.router.navigateByUrl(`${AUTH_ROUTE_NAMES.SELF}/${AUTH_ROUTE_NAMES.REGISTER}`);
    this.dialog.close();
  }

  public onFileChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      this.fileHasError = !this.isFileValid(target.files);
      this.fileName = `${target.files[0].name.substring(0, 30)}...`;
      this.formGroup.controls.paymentFile.setValue(target.files[0]);
    }
  }

  public onClearFile(): void {
    this.fileName = '';
    this.paymentFileInput.nativeElement.value = '';
    this.formGroup.controls.paymentFile.reset();
    this.fileHasError = false;
  }

  private isFileValid(files: FileList): boolean {
    const file = files[0];

    if (file.size > this.maxSize || !this.allowedFormats.includes(file.type)) {
      return false;
    }

    return true;
  }
}
