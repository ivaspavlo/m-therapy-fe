import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Component({
  selector: 'app-unsubscribe',
  templateUrl: './unsubscribe.component.html',
  styleUrls: ['./unsubscribe.component.scss', '../../auth-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UnsubscribeComponent {
  public isUnsubscribed$!: Observable<boolean>;

  constructor(
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.isUnsubscribed$ = this.activatedRoute.data.pipe(
      map((res: Data) => {
        return typeof res.data.success === 'boolean'
          ? res.data.success
          : false;
      }),
      catchError(() => of(false))
    );
  }
}
