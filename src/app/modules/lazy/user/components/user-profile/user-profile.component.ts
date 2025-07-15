import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { catchError, first, takeUntil } from 'rxjs/operators';
import { BehaviorSubject, of } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

import { IResponse, IUser } from '@app/interfaces';
import { DateValidators, ToastType, USER_DATA_FIELDS } from '@app/core/constants';
import { ToasterService, UserApiService, UserManagementService } from '@app/core/services';
import { DestroySubscriptions } from '@app/shared/classes';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserProfileComponent extends DestroySubscriptions implements OnInit {
  public form!: FormGroup;
  public userFieldName = USER_DATA_FIELDS;
  public userFieldsList = [
    USER_DATA_FIELDS.FIRSTNAME,
    USER_DATA_FIELDS.LASTNAME,
    USER_DATA_FIELDS.BIRTHDAY,
    USER_DATA_FIELDS.EMAIL,
    USER_DATA_FIELDS.PHONE
  ];
  public isLoading$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public isFormChanged: boolean = false;

  private initialFormValueSnapshot: string = '';
  private messages = {
    success: '',
    error: ''
  }

  constructor(
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    private userService: UserManagementService,
    private userApiService: UserApiService,
    private toasterService: ToasterService,
    private translateService: TranslateService
  ) {
    super();
  }

  ngOnInit(): void {
    this.setupForm();
  }

  public onSave(): void
  {
    if (this.isFormChanged) {
      this.isLoading$.next(true);
      this.userApiService.updateUserDetails(this.form.value).pipe(
        catchError(() => of(null))
      ).subscribe((res: IResponse<null> | null) => {
        this.isLoading$.next(false);
        if (res === null) {
          this.toasterService.show(
            this.translateService.instant(this.messages.error),
            ToastType.ERROR
          );
        }
        this.toasterService.show(
          this.translateService.instant(this.messages.success),
          ToastType.SUCCESS
        );
      });
    }
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

      this.initialFormValueSnapshot = JSON.stringify(this.form.value);

      this.listenToFormChanges();
      this.cdr.detectChanges();
    });
  }

  private listenToFormChanges(): void {
    this.form.valueChanges.pipe(
      takeUntil(this.componentDestroyed$)
    ).subscribe((value: object) => this.isFormChanged = JSON.stringify(value) !== this.initialFormValueSnapshot);
  }
}
