import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { INPUT_TYPES, ToastType } from '@app/core/constants';
import { AuthApiService, ToasterService } from '@app/core/services';
import { IRemindReq, IResponse } from '@app/interfaces';


@Component({
  selector: 'app-remind',
  templateUrl: './remind.component.html',
  styleUrls: ['./remind.component.scss', '../../auth-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RemindComponent {
  @Output() login: EventEmitter<IRemindReq> = new EventEmitter();
  public isLoading: boolean = false;
  public remindForm!: FormGroup;
  public INPUT_TYPES = INPUT_TYPES;
  public isRemindLinkSent: boolean = false;
  private messages = {
    success: 'auth.remind.success',
    failure: 'auth.remind.failure'
  }

  constructor(
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    private authService: AuthApiService,
    private toasterService: ToasterService,
    private translateService: TranslateService
  ) { }

  ngOnInit(): void {
    this.remindForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      lang: ['']
    });
  }

  public onRemind(event: MouseEvent): void {
    event.stopPropagation();
    event.preventDefault();
    this.isLoading = true;
    const req = {
      ...this.remindForm.value,
      lang: this.translateService.currentLang
    };
    this.authService.remind(req).pipe(
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

      this.isRemindLinkSent = true;
      this.remindForm.reset();
      this.toasterService.show(
        this.translateService.instant(this.messages.success),
        ToastType.SUCCESS
      );
    });
  }
}
