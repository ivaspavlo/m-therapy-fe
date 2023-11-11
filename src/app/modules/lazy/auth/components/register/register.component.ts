import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { INPUT_TYPES, ToastType } from '@app/core/constants';
import { AuthService, ToasterService } from '@app/core/services';
import { DateValidators, PasswordValidators } from '../../constants';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterComponent {
  public registerForm!: FormGroup;
  public INPUT_TYPES = INPUT_TYPES;
  private messages = {
    success: 'auth.success',
    failure: 'auth.failure'
  }

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private toasterService: ToasterService,
    private translateService: TranslateService
  ) { }

  ngOnInit() {
    this.registerForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.minLength(12)]],
      password: ['',  [Validators.required, PasswordValidators.default]],
      confirmPassword: ['', [Validators.required, PasswordValidators.default, PasswordValidators.passwordsEqual()]],
      birthday: ['', [Validators.required, DateValidators.birthDate]]
    });
  }

  public onRegister(): void {
    this.authService.register(this.registerForm.value).pipe(
      catchError(() => of(null))
    ).subscribe((res: any) => {
      if (!res) {
        this.toasterService.show(this.translateService.instant(this.messages.failure), ToastType.ERROR);
      }
    });
  }
}
