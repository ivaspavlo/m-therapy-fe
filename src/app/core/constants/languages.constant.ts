import { ILanguage } from '@app/interfaces';


export enum LANGUAGES {
  EN = 'en',
  UA = 'ua'
};

export const LANGUAGES_ITEMS: ILanguage[] = [
  { aria: 'language-bar.en', title: LANGUAGES.EN },
  { aria: 'language-bar.ua', title: LANGUAGES.UA }
];
