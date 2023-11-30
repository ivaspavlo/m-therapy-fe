import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { INPUT_TYPES, ToastType } from '@app/core/constants';
import { AuthService, ToasterService } from '@app/core/services';
import { ILogin } from '../../interfaces';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss', '../../auth-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit {

  @Output() login: EventEmitter<ILogin> = new EventEmitter();

  public loginForm!: FormGroup;
  public INPUT_TYPES = INPUT_TYPES;
  public isLoading: boolean = false;
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

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      login: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  public onLogin(event: MouseEvent): void {
    event.stopPropagation();
    event.preventDefault();
    this.isLoading = true;
    this.authService.login(this.loginForm.value).pipe(
      catchError(() => of(null))
    ).subscribe((res: any) => {
      this.isLoading = false;
      if (!res) {
        this.toasterService.show(
          this.translateService.instant(this.messages.failure),
          ToastType.ERROR
        );
        return;
      }
      this.loginForm.reset();
      this.toasterService.show(
        this.translateService.instant(this.messages.success),
        ToastType.SUCCESS
      );
    });
  }

}
