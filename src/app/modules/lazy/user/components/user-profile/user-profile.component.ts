import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { USER_DATA_FIELDS } from '@app/core/constants';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserProfileComponent implements OnInit {
  public userFields = [
    USER_DATA_FIELDS.FIRSTNAME,
    USER_DATA_FIELDS.LASTNAME,
    USER_DATA_FIELDS.BIRTHDAY,
    USER_DATA_FIELDS.EMAIL,
    USER_DATA_FIELDS.PHONE,
    USER_DATA_FIELDS.LANG
  ];
  public form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.form = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.minLength(12)]],
      birthday: ['', [Validators.required]], // DateValidators.birthDate]
      hasEmailConsent: [false],
      hasConditionsConsent: [false, Validators.requiredTrue]
    });
    this.cdr.detectChanges();
  }
}
