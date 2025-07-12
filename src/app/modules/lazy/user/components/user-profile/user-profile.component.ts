import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DateValidators, USER_DATA_FIELDS } from '@app/core/constants';
import { UserManagementService } from '@app/core/services';
import { IUser } from '@app/interfaces';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserProfileComponent implements OnInit {
  public form!: FormGroup;
  public userFieldName = USER_DATA_FIELDS;
  public userFieldsList = [
    USER_DATA_FIELDS.FIRSTNAME,
    USER_DATA_FIELDS.LASTNAME,
    USER_DATA_FIELDS.BIRTHDAY,
    USER_DATA_FIELDS.EMAIL,
    USER_DATA_FIELDS.PHONE
  ];
  public isEditMode: boolean = false;

  constructor(
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    private userService: UserManagementService
  ) { }

  ngOnInit(): void {
    this.setupForm();
  }

  public onEdit(): void
  {
    this.isEditMode = !this.isEditMode;
    this.isEditMode ? this.form.enable() : this.form.disable();
  }

  public onSave(): void
  {
    console.log('works');
  }

  private setupForm(): void {
    this.userService.currentUser$.pipe(
      first()
    ).subscribe((user: IUser | null) => {
      if (!user) {
        return;
      }
      this.form = this.fb.group({
        [USER_DATA_FIELDS.FIRSTNAME]: [user.firstname],
        [USER_DATA_FIELDS.LASTNAME]: [user.lastname],
        [USER_DATA_FIELDS.EMAIL]: [user.email, [Validators.email]],
        [USER_DATA_FIELDS.PHONE]: [user.phone, [Validators.minLength(12)]],
        [USER_DATA_FIELDS.BIRTHDAY]: [user.birthday, [DateValidators.birthDate]]
      });

      this.form.disable();
      this.cdr.detectChanges();
    });
  }
}
