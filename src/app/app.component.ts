import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CoreRoutingAnimations, LANGUAGES } from '@app/core/constants';
import { TranslateService } from '@ngx-translate/core';
import { LOCALE } from './core/providers';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  animations: [ CoreRoutingAnimations ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {

  constructor(
    @Inject(LOCALE) private localeId: LANGUAGES,
    private translateService: TranslateService
  ) { }

  ngOnInit(): void {
    debugger;
    this.translateService.use(this.localeId);
  }

  public prepareRoute(outlet: RouterOutlet): boolean {
		return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animationState'];
	}

}
