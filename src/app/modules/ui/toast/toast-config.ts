import { InjectionToken, TemplateRef } from '@angular/core';
import { IToastConfig } from './interfaces';


export enum ToastTypes {
  warn = 'warn',
  info = 'info',
  success = 'success'
}

export class ToastData {
  type: string;
  text?: string;
  template?: TemplateRef<any>;
  templateContext?: {};
  href?: string;
  linkName?: string;
}

export const defaultToastConfig: IToastConfig = {
  position: {
    top: 20,
    right: 20
  },
  animation: {
    fadeOut: 300,
    fadeIn: 300
  },
};

export const TOAST_CONFIG_TOKEN = new InjectionToken('toast-config');
