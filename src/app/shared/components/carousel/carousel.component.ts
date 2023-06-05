
import { Component, ChangeDetectionStrategy, AfterViewInit, OnDestroy, Input, ElementRef, ViewChild, ChangeDetectorRef } from '@angular/core';
import { fromEvent, interval, merge, Observable, Subject } from 'rxjs';
import { switchMap, take, takeUntil, tap } from 'rxjs/operators';


@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CarouselComponent implements AfterViewInit, OnDestroy {

  @Input() products: { id: string, src: string, name?: string }[] = [
    { id: '1', src: '/assets/images/png/landing-bg.png' },
    { id: '2', src: '/assets/images/png/landing-bg.png' },
    { id: '3', src: '/assets/images/png/landing-bg.png' },
    { id: '4', src: '/assets/images/png/landing-bg.png' }
  ];

  @ViewChild('carousel') carousel: ElementRef;

  private componentDestroyed$: Subject<void> = new Subject();
  private cancelShiftInterval$: any = new Subject().pipe( takeUntil(this.componentDestroyed$) );
  private carouselMouseLeave$: Observable<any>;

  public active = 0;
  public next = 1;
  public prev = this.products.length - 1;

  constructor(
    private cdr: ChangeDetectorRef
  ) { }

  ngAfterViewInit() {
    this.carouselMouseLeave$ = this.getCarouselMouseLeaveListener();

    this.startMouseEnterListening();
    this.startShiftInterval();
  }

  private startShiftInterval(): void {
    interval(5000)
      .pipe(
        takeUntil(
          merge(
            this.componentDestroyed$,
            this.cancelShiftInterval$
          )
        )
      )
      .subscribe(_ => { this.gotoNext(); });
  }

  private startMouseEnterListening(): void {
    fromEvent(this.carousel.nativeElement, 'mouseenter')
      .pipe(
        takeUntil(this.componentDestroyed$),
        tap(_ => { this.cancelShiftInterval$.next(); }),
        switchMap(_ => this.carouselMouseLeave$)
      )
      .subscribe();
  }

  private getCarouselMouseLeaveListener(): Observable<any> {
    return fromEvent(this.carousel.nativeElement, 'mouseleave')
      .pipe(
        take(1),
        // tap(_ => { this.startShiftInterval(); })
      );
  }

  public gotoPrev(): void {
    this.active > 0 ?
      this.gotoNum(this.active - 1) :
      this.gotoNum(this.products.length - 1);
  }

  public gotoNext(): void {
    this.active < this.products.length - 1 ?
      this.gotoNum(this.active + 1) :
      this.gotoNum(0);
  }

  private gotoNum(number): void {
    this.active = number;
    this.prev = this.active - 1 === -1 ?
      this.products.length - 1 : this.active - 1;
    this.next =
      this.active + 1 === this.products.length ?
        0 : this.active + 1;
    this.cdr.detectChanges();
  }

  public goToProduct(productId: string, isActive: boolean = false): void {
    // if (isActive) { this.router.navigate(['/product', productId]); }
  }

  ngOnDestroy(): void {
    this.componentDestroyed$.next();
    this.componentDestroyed$.unsubscribe();
  }

}
