import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { INPUT_TYPES } from '@app/core/constants';

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

  constructor(
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      [this.controlName]: this.fb.control('', [Validators.required, Validators.email])
    });
  }

  public onInputSubmit(): void {
    console.log('works');
  }
}
