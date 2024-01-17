import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, takeUntil } from 'rxjs/operators';
import { ScrollTargetElements } from '@app/core/constants';
import { AdApiService } from '@app/core/services';
import { IAd, IResponse } from '@app/interfaces';
import { DestroySubscriptions } from '@app/shared/classes';


@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainPageComponent extends DestroySubscriptions {
  public ScrollTargetElements = ScrollTargetElements;
  public ads$!: Observable<IAd[]>;

  constructor(
    private adService: AdApiService
  ) {
    super();
  }

  ngOnInit(): void {
    this.initAds();
  }

  private initAds(): void {
    this.ads$ = this.adService.getAds().pipe(
      takeUntil(this.componentDestroyed$),
      catchError(() => of(null)),
      map((res: IResponse<IAd[]> | null) => res ? res.data : [])
    );
  }
}
