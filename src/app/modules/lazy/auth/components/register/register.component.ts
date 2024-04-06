import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { catchError, takeUntil } from 'rxjs/operators';
import { of } from 'rxjs';
import { INPUT_TYPES, ToastType } from '@app/core/constants';
import { AuthApiService, ToasterService } from '@app/core/services';
import { DestroySubscriptions } from '@app/shared/classes';
import { IResponse } from '@app/interfaces';
import { DialogService } from '@app/modules/ui';
import { DateValidators, PasswordValidators } from '../../constants';
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
  public isLoading: boolean = false;
  public isEmailConfirmationRequired: boolean = false;
  private messages = {
    success: 'auth.register.success',
    failure: 'auth.register.failure'
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
      lang: [''],
      hasEmailConsent: [false],
      hasConditionsConsent: [false, Validators.required]
    });
  }

  public onRegister(event: MouseEvent): void {
    event.stopPropagation();
    event.preventDefault();
    this.isLoading = true;
    const req = {
      ...this.registerForm.value,
      lang: this.translateService.currentLang
    };
    this.authService.register(req).pipe(
      catchError(() => of(null))
    ).subscribe((res: null | IResponse<object>) => {
      this.isLoading = false;
      this.cdr.markForCheck();
      if (!res) {
        this.toasterService.show(
          this.translateService.instant(this.messages.failure),
          ToastType.ERROR
        );
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
      console.log('works');
    });
  }
}
