import { DOCUMENT } from '@angular/common';
import { Component, OnInit, ChangeDetectionStrategy, Inject, Input } from '@angular/core';
import { fromEvent, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LANGUAGES } from '@app/core/constants';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit {

  @Input() scrollOrigin: HTMLElement;

  public isOpen = false;
  public languages = Object.values(LANGUAGES);

  public headerControls = [
    { uiName: 'services', link: '' },
    { uiName: 'gifts', link: '' },
    { uiName: 'blog', link: '' }
  ];
  public isShrinked$: Observable<boolean>;

  constructor(
    @Inject(DOCUMENT) private document: Document
  ) { }

  ngOnInit(): void {
    this.initIsShrinkedObservable();
  }

  public onLanguageChange(language: string): void {
    console.log(language);
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
