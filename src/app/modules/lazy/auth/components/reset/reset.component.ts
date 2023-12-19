import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { INPUT_TYPES, ToastType } from '@app/core/constants';
import { IResponse, IUpdateReq } from '@app/interfaces';
import { AuthApiService, ToasterService } from '@app/core/services';
import { PasswordValidators, UPDATE_TOKEN } from '../../constants';


@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.scss', '../../auth-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ResetComponent {
  @Output() login: EventEmitter<IUpdateReq> = new EventEmitter();

  public resetToken: string = '';
  public resetForm!: FormGroup;
  public INPUT_TYPES = INPUT_TYPES;
  public isLoading: boolean = false;
  public isReset: boolean = false;
  private messages = {
    success: 'auth.reset.success',
    failure: 'auth.reset.failure'
  }

  constructor(
    private route : ActivatedRoute,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    private authService: AuthApiService,
    private toasterService: ToasterService,
    private translateService: TranslateService
  ) { }

  ngOnInit(): void {
    this.resetToken = this.route.snapshot.params[UPDATE_TOKEN];
  
    debugger;
    this.resetForm = this.fb.group({
      password: ['',  [Validators.required, PasswordValidators.default]],
      confirmPassword: ['', [Validators.required, PasswordValidators.default, PasswordValidators.passwordsEqual()]]
    });
  }

  public onReset(event: MouseEvent): void {
    event.stopPropagation();
    event.preventDefault();
    this.isLoading = true;
    this.authService.reset({ password: this.resetForm.value.password }, this.resetToken).pipe(
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

      this.isReset = true;
      this.resetForm.reset();
      this.toasterService.show(
        this.translateService.instant(this.messages.success),
        ToastType.SUCCESS
      );
    });
  }
}
