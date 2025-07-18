import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { of } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { CoreRoutingAnimations, LANGUAGE, USER_ID, USER_NAME } from '@app/core/constants';
import { LOCALE, LOCAL_STORAGE } from './core/providers';
import { IResponse, IUser } from './interfaces';
import { catchError } from 'rxjs/operators';
import { UserApiService, UserManagementService } from './core/services';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  animations: [ CoreRoutingAnimations ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {

  constructor(
    @Inject(LOCALE) private locale: LANGUAGE,
    @Inject(LOCAL_STORAGE) private localStorage: Storage,
    private userApiService: UserApiService,
    private translateService: TranslateService,
    private userManagementService: UserManagementService
  ) { }

  ngOnInit(): void {
    this.translateService.use(this.locale);
    this.refreshUserData();
  }

  public prepareRoute(outlet: RouterOutlet): boolean {
		return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animationState'];
	}

  private refreshUserData(): void {
    const userId = this.localStorage.getItem(USER_ID);
    if (!userId) {
      return;
    }
    this.userApiService.getUserById().pipe(
      catchError(() => of(null))
    ).subscribe((res: IResponse<IUser> | null) => {
      if (!res) {
        this.userManagementService.logout();
        return;
      }
      this.userManagementService.setUser(res.data);
    });
  }
}
