import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-unsubscribe',
  templateUrl: './unsubscribe.component.html',
  styleUrls: ['./unsubscribe.component.scss', '../../auth-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UnsubscribeComponent {
  public isUnsubscribed$: Observable<boolean> | null = null;

  constructor(
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.isUnsubscribed$ = this.activatedRoute.data.pipe(
      map(({ data }) => data)
    );
  }
}
