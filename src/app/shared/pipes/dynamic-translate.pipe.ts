import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { LANGUAGE } from '@app/core/constants';
import { ITranslationDynamic } from '@app/interfaces';

@Pipe({
  name: 'dynamicTranslate'
})
export class DynamicTranslatePipe implements PipeTransform {

  constructor(
    private translateService: TranslateService
  ) { }

  transform(value: ITranslationDynamic): Observable<string> {
    return this.translateService.onLangChange.pipe(
      startWith(this.translateService.currentLang),
      map(() => value[this.translateService.currentLang as LANGUAGE.EN | LANGUAGE.UA])
    );
  }
}
