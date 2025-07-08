import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DateValidators, USER_DATA_FIELDS } from '@app/core/constants';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserProfileComponent implements OnInit {
  public userFieldName = USER_DATA_FIELDS;
  public userFieldsList = [
    USER_DATA_FIELDS.FIRSTNAME,
    USER_DATA_FIELDS.LASTNAME,
    USER_DATA_FIELDS.BIRTHDAY,
    USER_DATA_FIELDS.EMAIL,
    USER_DATA_FIELDS.PHONE
  ];
  public form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  public onEdit(): void
  {
    this.form.enable();
  }

  public onSave(): void
  {
    console.log('works');
  }

  private initForm(): void {
    this.form = this.fb.group({
      [USER_DATA_FIELDS.FIRSTNAME]: ['test'],
      [USER_DATA_FIELDS.LASTNAME]: ['test'],
      [USER_DATA_FIELDS.EMAIL]: ['test', [Validators.email]],
      [USER_DATA_FIELDS.PHONE]: ['test', [Validators.minLength(12)]],
      [USER_DATA_FIELDS.BIRTHDAY]: ['test', [DateValidators.birthDate]]
    });
    this.form.disable();
    this.cdr.detectChanges();
  }
}
