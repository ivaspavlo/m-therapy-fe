import { LANGUAGE } from '@app/core/constants';


export interface ILanguage {
  title: LANGUAGE,
  aria: string
}

export interface ITranslationDynamic {
  [LANGUAGE.EN]: string,
  [LANGUAGE.UA]: string
}
