import { DOCUMENT } from '@angular/common';
import { Component, OnInit, ChangeDetectionStrategy, Inject, Input } from '@angular/core';
import { fromEvent, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LANGUAGES_ITEMS, SECTION_IDS } from '@app/core/constants';
import { ILanguage } from '@app/interfaces';
import { TranslateService } from '@ngx-translate/core';


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

  public headerControls = [
    { uiName: 'header.services', sectionId: SECTION_IDS.services },
    { uiName: 'header.gifts', sectionId: SECTION_IDS.gifts },
    { uiName: 'header.blog', link: '' }
  ];
  public isShrinked$: Observable<boolean>;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private translateService: TranslateService
  ) { }

  ngOnInit(): void {
    this.initIsShrinkedObservable();
  }

  public onLanguageChange(language: ILanguage): void {
    this.translateService.use(language.title);
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
