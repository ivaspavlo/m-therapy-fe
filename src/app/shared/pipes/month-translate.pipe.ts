import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { LANGUAGE } from '@app/core/constants';

@Pipe({
  name: 'monthTranslate'
})
export class MonthTranslatePipe implements PipeTransform {

  constructor(
    private translateService: TranslateService
  ) { }

  transform(value: string | null): Observable<string> {
    return this.translateService.onLangChange.pipe(
      startWith(this.translateService.currentLang),
      map(() => {
        if (!value) {
          return '';
        }
        return this.translateService.currentLang === LANGUAGE.EN
          ? value
          : this.translateService.instant(`month.${value.toLowerCase()}`)
      })
    );
  }
}
