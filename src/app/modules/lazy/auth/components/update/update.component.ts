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
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss', '../../auth-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UpdateComponent {
  @Output() login: EventEmitter<IUpdateReq> = new EventEmitter();

  public updateToken: string = '';
  public updateForm!: FormGroup;
  public INPUT_TYPES = INPUT_TYPES;
  public isLoading: boolean = false;
  public isUpdated: boolean = false;
  private messages = {
    success: 'auth.update.success',
    failure: 'auth.update.failure'
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
    this.updateToken = this.route.snapshot.params[UPDATE_TOKEN];
  
    debugger;
    this.updateForm = this.fb.group({
      password: ['',  [Validators.required, PasswordValidators.default]],
      confirmPassword: ['', [Validators.required, PasswordValidators.default, PasswordValidators.passwordsEqual()]]
    });
  }

  public onUpdate(event: MouseEvent): void {
    event.stopPropagation();
    event.preventDefault();
    this.isLoading = true;
    this.authService.update({ password: this.updateForm.value.password }, this.updateToken).pipe(
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

      this.isUpdated = true;
      this.updateForm.reset();
      this.toasterService.show(
        this.translateService.instant(this.messages.success),
        ToastType.SUCCESS
      );
    });
  }
}
