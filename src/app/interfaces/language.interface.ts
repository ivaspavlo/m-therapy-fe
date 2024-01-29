import { LANGUAGES } from '@app/core/constants';


export interface ILanguage {
  title: LANGUAGES,
  aria: string
}

export interface ITranslationDynamic {
  [LANGUAGES.EN]: string,
  [LANGUAGES.UA]: string
}
