import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { first, map, shareReplay, tap } from 'rxjs/operators';

import { LANGUAGES, ToastType } from '@app/core/constants';
import { ToasterService } from '@app/core/services';
import { IResponse } from '@app/interfaces';

@Component({
  selector: 'app-unsubscribe',
  templateUrl: './unsubscribe.component.html',
  styleUrls: ['./unsubscribe.component.scss', '../../auth-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UnsubscribeComponent {
  public isUnsubscribed$!: Observable<boolean>;
  private messages = {
    failure: 'main.unsubscribe.failure-reason'
  }

  constructor(
    private activatedRoute: ActivatedRoute,
    private toasterService: ToasterService,
    private translateService: TranslateService
  ) { }

  ngOnInit(): void {
    this.isUnsubscribed$ = this.activatedRoute.data.pipe(
      first(),
      map((res: Data) => {
        if (res === null) {
          return false;
        }
        const responseBody = res.data as IResponse<{lang: LANGUAGES}>;
        this.translateService.setDefaultLang(responseBody.data.lang);
        return responseBody.success;
      }),
      tap((res: boolean) => {
        if (!res) {
          return this.toasterService.show(this.translateService.instant(this.messages.failure), ToastType.ERROR);
        }
      }),
      shareReplay()
    );
  }
}
