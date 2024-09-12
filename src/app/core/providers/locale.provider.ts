import { FactoryProvider, InjectionToken } from '@angular/core';
import { LANGUAGE } from '../constants';


export const LOCALE = new InjectionToken('Locale');

export const localeProvider: FactoryProvider = {
  provide: LOCALE,
  useFactory: (): LANGUAGE => {
    const browserLanguage = navigator?.language;
    if (!browserLanguage || typeof browserLanguage !== 'string' || browserLanguage.indexOf('-') === -1) {
      return LANGUAGE.EN;
    }
    const locale = navigator.language.split('-')[0];
    // @ts-ignore
    return LANGUAGE[locale] ?? LANGUAGE.EN;
  }
}
