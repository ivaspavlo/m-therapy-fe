import { Component, OnInit, Inject, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ToastData, TOAST_CONFIG_TOKEN } from '../toast-config';
import { ToastRef } from '../toast-ref';
import { toastAnimations, ToastAnimationState } from '../toast.animation';
import { IToastConfig } from '../interfaces';


@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
  animations: [toastAnimations.fadeToast],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToastComponent implements OnInit {

  public animationState: ToastAnimationState = 'default';
  private intervalId: any;

  constructor(
    readonly data: ToastData,
    readonly ref: ToastRef,
    private cdr: ChangeDetectorRef,
    @Inject(TOAST_CONFIG_TOKEN) public toastConfig: IToastConfig
  ) { }

  ngOnInit() {
    this.intervalId = setTimeout(() => {
      this.animationState = 'closing';
      this.cdr.detectChanges();
    }, 3000);
  }
  
  public close(): void {
    this.ref.close();
  }

  public onFadeFinished(event: any): void {
    const { toState } = event;
    const isFadeOut = (toState as ToastAnimationState) === 'closing';
    const itFinished = this.animationState === 'closing';

    if (isFadeOut && itFinished) {
      this.close();
    }
  }
  
  ngOnDestroy() {
    clearTimeout(this.intervalId);
  }

}
