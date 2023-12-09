import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { catchError, switchMap, tap } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { ACCESS_TOKEN, INPUT_TYPES, ToastType, USER_ID, USER_NAME } from '@app/core/constants';
import { LOCAL_STORAGE } from '@app/core/providers';
import { AuthApiService, ToasterService, UserApiService, UserManagementService } from '@app/core/services';
import { ILoginReq, ILoginRes, IResponse, IUser } from '@app/interfaces';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss', '../../auth-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit {

  @Output() login: EventEmitter<ILoginReq> = new EventEmitter();

  public loginForm!: FormGroup;
  public INPUT_TYPES = INPUT_TYPES;
  public isLoading: boolean = false;
  private messages = {
    success: 'auth.login.success',
    failure: 'auth.login.failure'
  }

  constructor(
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    private authService: AuthApiService,
    private userApiService: UserApiService,
    private userManagementService: UserManagementService,
    private toasterService: ToasterService,
    private translateService: TranslateService,
    private router: Router,
    @Inject(LOCAL_STORAGE) private localStorage: Storage
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  public onLogin(event: MouseEvent): void {
    event.stopPropagation();
    event.preventDefault();
    this.isLoading = true;
    this.authService.login(this.loginForm.value).pipe(
      catchError(() => of(null)),
      tap((res: null | IResponse<ILoginRes>) => {
        if (res) {
          this.localStorage[ACCESS_TOKEN] = res.data.jwtToken;
          this.localStorage[USER_ID] = res.data.id;
        }
      }),
      switchMap((res: null | IResponse<ILoginRes>) => res
        ? this.userApiService.getUserById(res.data.id)
        : of(res)
      )
    ).subscribe((res: null | IResponse<IUser>) => {
      this.isLoading = false;
      this.cdr.markForCheck();

      this.showToastMessage(!!res);

      if (!res) {
        return;
      }

      this.localStorage[USER_NAME] = res.data.firstname;

      this.userManagementService.setUser(res.data);
      this.loginForm.reset();
      this.router.navigateByUrl('/');
    });
  }

  private showToastMessage(res: boolean): void {
    res
      ? this.toasterService.show(
          this.translateService.instant(this.messages.success),
          ToastType.SUCCESS
        )
      : this.toasterService.show(
          this.translateService.instant(this.messages.success),
          ToastType.SUCCESS
        );
  }

}
