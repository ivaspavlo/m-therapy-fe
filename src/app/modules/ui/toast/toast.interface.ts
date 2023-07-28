import { TemplateRef } from '@angular/core';


export interface IToast {
  type: string;
  text?: string;
  template?: TemplateRef<any>;
  templateContext?: {};
  href?: string;
  linkName?: string;
}

export interface IToastConfig {
  position?: {
    top: number;
    right: number;
  };
  animation?: {
    fadeOut: number;
    fadeIn: number;
  };
}
