
import { windowProvider } from './window.provider';
import { sessionStorageProvider } from './session-storage.provider';
import { localStorageProvider } from './local-storage.provider';


export * from './window.provider';
export * from './session-storage.provider';
export * from './local-storage.provider';

export const CORE_PROVIDERS = [
  windowProvider,
  sessionStorageProvider,
  localStorageProvider
];
