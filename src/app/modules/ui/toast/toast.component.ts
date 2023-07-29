import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ToastAnimationState, toastAnimations } from './toast.animation';


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
    private cdr: ChangeDetectorRef
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
