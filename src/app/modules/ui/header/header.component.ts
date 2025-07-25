import { DOCUMENT } from '@angular/common';
import { Component, OnInit, ChangeDetectionStrategy, Inject, Input } from '@angular/core';
import { fromEvent, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { CORE_ROUTE_NAMES, LANGUAGE_ITEMS, ScrollTargetElements, ToastType } from '@app/core/constants';
import { IHeaderControl, ILanguage, IUser } from '@app/interfaces';
import { BookingManagementService, ScrollService, ToasterService, UserManagementService } from '@app/core/services';
import { Router } from '@angular/router';
import { BOOKING_ROUTE_NAMES } from '@app/modules/lazy/booking/constants';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit {
  @Input() scrollOrigin: HTMLElement | null = null;

  private userLogoutButtonId = 'app-header.services.logout';

  public isMenuOpen = false;
  public isUserMenuOpen = false;
  public languages: ILanguage[] = LANGUAGE_ITEMS;
  public isLoggedIn$!: Observable<boolean>;
  public cartItemsQty: number = 0;
  public headerControls: IHeaderControl[] = [
    { id: 'app-header.services.button', uiName: 'header.services', scrollTarget: ScrollTargetElements.SERVICES_SECTION },
    { id: 'app-header.services.gifts', uiName: 'header.gifts', scrollTarget: ScrollTargetElements.GIFTS_SECTION },
    { id: 'app-header.services.blog', uiName: 'header.blog', link: '' }
  ];
  public authUserControls: IHeaderControl[] = [
    { id: this.userLogoutButtonId, uiName: 'header.user.logout', link: '/' },
    { id: 'app-header.services.profile', uiName: 'header.user.profile', link: '/user/profile' },
    { id: 'app-header.services.orders', uiName: 'header.user.orders', link: '/user/orders' }
  ];
  public notAuthUserControls: IHeaderControl[] = [
    { id: 'app-header.services.login', uiName: 'header.user.login', link: '/auth/login' }
  ];
  public isShrinked$!: Observable<boolean>;
  private messages: Record<string, string> = {
    logout: 'auth.logout'
  }

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private translateService: TranslateService,
    private scrollService: ScrollService,
    private userManagementService: UserManagementService,
    private router: Router,
    private toasterService: ToasterService,
    private bookingManagementService: BookingManagementService
  ) { }

  ngOnInit(): void {
    this.initIsShrinkedObservable();
    this.isLoggedIn$ = this.userManagementService.currentUser$.pipe(map((value: IUser | null) => !!value));
    this.cartItemsQty = this.bookingManagementService.cart?.bookings?.length || 0;
  }

  public onLanguageChange(language: ILanguage): void {
    this.translateService.use(language.title);
  }

  public onClickHeaderControl(scrollTarget?: string): void {
    if (!scrollTarget) {
      return;
    }
    if (this.isMenuOpen) {
      this.isMenuOpen = false;
    }
    this.scrollService.scrollToElement(scrollTarget as ScrollTargetElements);
  }

  public onClickUserMenu(control: IHeaderControl): void {
    this.onToggleUserMenu(false);
    if (control.id === this.userLogoutButtonId) {
      this.userManagementService.logout();
      this.toasterService.show(this.translateService.instant(this.messages.logout), ToastType.SUCCESS)
      this.router.navigateByUrl(control.link!);
    }
    if (control.link) {
      control.id === this.userLogoutButtonId && this.userManagementService.logout();
      this.router.navigateByUrl(control.link);
      return;
    }
  }

  public onToggleUserMenu(isOpen?: boolean): void {
    if (isOpen === false) {
      this.isUserMenuOpen = false;
      return;
    }
    this.isUserMenuOpen = !this.isUserMenuOpen;
  }

  public onToggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  public onClickCart(): void {
    this.router.navigate([CORE_ROUTE_NAMES.BOOKING, BOOKING_ROUTE_NAMES.CART]);
  }

  private initIsShrinkedObservable(): void {
    this.isShrinked$ = fromEvent(this.scrollOrigin || this.document.body, 'scroll').pipe(
      map((event: Event) => {
        return event.target instanceof Element ?
          event.target.scrollTop > this.document.documentElement.clientHeight / 2 :
          false;
      })
    );
  }
}
