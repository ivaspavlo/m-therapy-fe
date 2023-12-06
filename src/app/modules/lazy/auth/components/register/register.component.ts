import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { INPUT_TYPES, ToastType } from '@app/core/constants';
import { AuthService, ToasterService } from '@app/core/services';
import { IResponse } from '@app/interfaces/api';
import { DateValidators, PasswordValidators } from '../../constants';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss', '../../auth-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterComponent {
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
    private authService: AuthService,
    private toasterService: ToasterService,
    private translateService: TranslateService
  ) { }

  ngOnInit() {
    this.registerForm = this.fb.group({
      firstname: ['test', Validators.required],
      lastname: ['test', Validators.required],
      email: ['test@gmail.com', [Validators.required, Validators.email]],
      phone: ['111222333444', [Validators.required, Validators.minLength(12)]],
      password: ['TopSecret+1',  [Validators.required, PasswordValidators.default]],
      confirmPassword: ['TopSecret+1', [Validators.required, PasswordValidators.default, PasswordValidators.passwordsEqual()]],
      birthday: ['', [Validators.required, DateValidators.birthDate]],
      lang: ['']
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
}
