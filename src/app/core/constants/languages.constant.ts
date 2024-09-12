import { ILanguage } from '@app/interfaces';


export enum LANGUAGE {
  EN = 'en',
  UA = 'ua'
};

export const LANGUAGE_ITEMS: ILanguage[] = [
  { aria: 'language-bar.en', title: LANGUAGE.EN },
  { aria: 'language-bar.ua', title: LANGUAGE.UA }
];
