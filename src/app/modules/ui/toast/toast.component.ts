import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { ToastAnimationState, toastAnimations } from './toast.animation';
import { TOAST_CONFIG_TOKEN, ToastData } from './toast-config';
import { IToastConfig } from './toast.interface';


@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
  animations: [toastAnimations.fadeToast],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToastComponent implements OnInit, OnDestroy {

  public animationState: ToastAnimationState = 'default';
  private intervalId: any;

  constructor(
    readonly data: ToastData,
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
    // this.ref.close();
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
