import { OnDestroy, Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LANGUAGES } from '@app/core/constants';
import { ITranslationDynamic } from '@app/interfaces';
import { Subject } from 'rxjs';
import { skip, takeUntil } from 'rxjs/operators';

@Pipe({
  name: 'dynamicTranslate'
})
export class DynamicTranslatePipe implements PipeTransform, OnDestroy {

  private destroy$ = new Subject<void>();
  private value: any;

  constructor(
    private translateService: TranslateService
  ) {
    translateService.onLangChange.pipe(
      skip(1),
      takeUntil(this.destroy$)
    ).subscribe(() => {
      this.transform(this.value);
    });
  }

  transform(value: ITranslationDynamic): string {
    this.value = value;
    return value[this.translateService.currentLang as LANGUAGES.EN | LANGUAGES.UA] ?? '';
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }
}
