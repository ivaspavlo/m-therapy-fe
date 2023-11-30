import { FactoryProvider, InjectionToken } from '@angular/core';
import { LANGUAGES } from '../constants';


export const LOCALE = new InjectionToken('Locale');

export const localeProvider: FactoryProvider = {
  provide: LOCALE,
  useFactory: (): LANGUAGES => {
    const browserLanguage = navigator?.language;
    if (!browserLanguage || typeof browserLanguage !== 'string' || browserLanguage.indexOf('-') === -1) {
      return LANGUAGES.EN;
    }
    const locale = navigator.language.split('-')[0];
    // @ts-ignore
    return LANGUAGES[locale] ?? LANGUAGES.EN;
  }
}
