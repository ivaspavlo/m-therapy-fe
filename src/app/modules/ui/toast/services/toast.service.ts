import { Overlay } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Inject, Injectable, Injector } from '@angular/core';
import { ToastInjector } from '../toast.injector';

import { ToastComponent } from '../container/toast.component';
import { ToastData, TOAST_CONFIG_TOKEN } from '../toast-config';
import { ToastRef } from '../toast-ref';
import { ToastModule } from '../toast.module';
import { IToastConfig } from '../interfaces';


@Injectable({
  providedIn: ToastModule
})
export class ToastService {

  private lastToast: ToastRef;

  constructor(
    private overlay: Overlay,
    private parentInjector: Injector,
    @Inject(TOAST_CONFIG_TOKEN) private toastConfig: IToastConfig
  ) { }

  public show(data: ToastData): ToastRef {
    this?.lastToast?.close();

    const positionStrategy = this.getPositionStrategy();
    const overlayRef = this.overlay.create({ positionStrategy });

    const toastRef = new ToastRef(overlayRef);
    this.lastToast = toastRef;

    const injector = this.getInjector(data, toastRef, this.parentInjector);
    const toastPortal = new ComponentPortal(ToastComponent, null, injector);

    overlayRef.attach(toastPortal);

    return toastRef;
  }

  public getPositionStrategy() {
    return this.overlay.position()
      .global()
      .bottom(this.getPosition())
      .right(`${this.toastConfig?.position?.right}px`);
  }

  private getPosition(): string {
    const lastToastIsVisible = this.lastToast && this.lastToast.isVisible();
    const position = lastToastIsVisible ? this.lastToast.getPosition().bottom : this.toastConfig?.position?.top;
    return `${position}px`;
  }

  private getInjector(data: ToastData, toastRef: ToastRef, parentInjector: Injector) {
    // configure and create injector
    const configMap = new WeakMap();
    configMap.set(ToastData, data);
    configMap.set(ToastRef, toastRef);
    
    return new ToastInjector(parentInjector, configMap);
  }
  
}
