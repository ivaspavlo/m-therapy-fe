import { DOCUMENT } from '@angular/common';
import { Component, OnInit, ChangeDetectionStrategy, Inject, Input } from '@angular/core';
import { fromEvent, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LANGUAGES_ITEMS, ScrollTargetElements } from '@app/core/constants';
import { ILanguage } from '@app/interfaces';
import { TranslateService } from '@ngx-translate/core';
import { ScrollService } from '@app/core/services/scroll.service';


interface IHeaderControl {
  uiName: string,
  scrollTarget?: ScrollTargetElements,
  link?: string
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit {

  @Input() scrollOrigin: HTMLElement;

  public isOpen = false;
  public languages: ILanguage[] = LANGUAGES_ITEMS;

  public headerControls: IHeaderControl[] = [
    { uiName: 'header.services', scrollTarget: ScrollTargetElements.SERVICES_SECTION },
    { uiName: 'header.gifts', scrollTarget: ScrollTargetElements.GIFTS_SECTION },
    { uiName: 'header.blog', link: '' }
  ];
  public isShrinked$: Observable<boolean>;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private translateService: TranslateService,
    private scrollService: ScrollService
  ) { }

  ngOnInit(): void {
    this.initIsShrinkedObservable();
  }

  public onLanguageChange(language: ILanguage): void {
    this.translateService.use(language.title);
  }

  public onClickHeaderControl(scrollTarget?: ScrollTargetElements): void {
    if (!scrollTarget) {
      return;
    }
    this.scrollService.scrollToElement(scrollTarget)
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
