import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ScrollTargetElements } from '@app/core/constants';
import { ContentApiService } from '@app/core/services';
import { IAd, IContent, IResponse } from '@app/interfaces';


@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainPageComponent {
  public ScrollTargetElements = ScrollTargetElements;
  public ads$!: Observable<IAd[]>;

  constructor(
    private contentApiService: ContentApiService
  ) { }

  ngOnInit(): void {
    this.initAds();
  }

  private initAds(): void {
    this.ads$ = this.contentApiService.getContent().pipe(
      catchError(() => of(null)),
      map((res: IResponse<IContent> | null) => res ? res.data.ads : [])
    );
  }
}
