import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';
import { catchError, takeUntil } from 'rxjs/operators';
import { of } from 'rxjs';

import { DateValidators, INPUT_TYPES, RESPONSE_STATUS, ToastType, USER_DATA_FIELDS } from '@app/core/constants';
import { AuthApiService, ToasterService } from '@app/core/services';
import { DestroySubscriptions } from '@app/shared/classes';
import { IRegisterReq, IResponse } from '@app/interfaces';
import { DialogService } from '@app/modules/ui';
import { PasswordValidators } from '../../constants';
import { TestModalComponent } from '../test-modal/test-modal.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss', '../../auth-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterComponent extends DestroySubscriptions {
  public registerForm!: FormGroup;
  public INPUT_TYPES = INPUT_TYPES;
  public USER_DATA_FIELDS = USER_DATA_FIELDS;
  public isLoading: boolean = false;
  public isEmailConfirmationRequired: boolean = false;

  private messages = {
    success: 'auth.register.success',
    failure: 'auth.register.failure',
    duplicate: 'auth.register.duplicate'
  }

  constructor(
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    private authService: AuthApiService,
    private toasterService: ToasterService,
    private translateService: TranslateService,
    private dialogService: DialogService
  ) {
    super();
  }

  ngOnInit() {
    this.registerForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.minLength(12)]],
      password: ['',  [Validators.required, PasswordValidators.default]],
      confirmPassword: ['', [Validators.required, PasswordValidators.default, PasswordValidators.passwordsEqual()]],
      birthday: ['', [Validators.required, DateValidators.birthDate]],
      hasEmailConsent: [false],
      hasConditionsConsent: [false, Validators.requiredTrue]
    });
  }

  public onRegister(event: MouseEvent): void {
    event.stopPropagation();
    event.preventDefault();
    this.isLoading = true;

    this.authService.register(
      this.getFormattedRequestBody(this.registerForm)
    ).pipe(
      catchError((res: HttpErrorResponse) => of(res.error))
    ).subscribe((res: IResponse<object | null>) => {
      this.isLoading = false;
      this.cdr.markForCheck();
      if (!res.success) {
        if (res?.status === RESPONSE_STATUS.DUPLICATE) {
          this.toasterService.show(this.translateService.instant(this.messages.duplicate), ToastType.ERROR);
        } else {
          this.toasterService.show(
            this.translateService.instant(this.messages.failure),
            ToastType.ERROR
          );
        }
        return;
      }
      this.isEmailConfirmationRequired = true;
      this.registerForm.reset();
      this.toasterService.show(
        this.translateService.instant(this.messages.success),
        ToastType.SUCCESS
      );
    });
  }

  public onShowConditions(event: MouseEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.dialogService.open(TestModalComponent, {}).afterClosed.pipe(
      takeUntil(this.componentDestroyed$)
    ).subscribe(() => {
      // to be developed
      console.log('works');
    });
  }

  private getFormattedRequestBody(form: FormGroup): IRegisterReq {
    const formValue = form.value;

    return {
      [USER_DATA_FIELDS.FIRSTNAME]: formValue.firstname,
      [USER_DATA_FIELDS.LASTNAME]: formValue.lastname,
      [USER_DATA_FIELDS.EMAIL]: formValue.email,
      [USER_DATA_FIELDS.PHONE]: formValue.phone,
      [USER_DATA_FIELDS.BIRTHDAY]: formValue.birthday,
      [USER_DATA_FIELDS.PASSWORD]: formValue.password,
      [USER_DATA_FIELDS.HAS_EMAIL_CONSENT]: formValue.hasEmailConsent,
      [USER_DATA_FIELDS.LANG]: this.translateService.currentLang
    }
  }
}
