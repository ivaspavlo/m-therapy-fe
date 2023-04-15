import { DOCUMENT } from '@angular/common';
import { Component, OnInit, ChangeDetectionStrategy, Inject, Input } from '@angular/core';
import { fromEvent } from 'rxjs';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit {

  @Input() scrollOrigin: HTMLElement;

  public headerControls = [
    { uiName: 'services', link: '' },
    { uiName: 'gifts', link: '' },
    { uiName: 'blog', link: '' }
  ];

  constructor(
    @Inject(DOCUMENT) private document: Document
  ) {
    // @ts-ignore
    this.scrollOrigin = this.scrollOrigin || this.document.documentElement;
  }

  ngOnInit(): void {
    this.listenToScroll();
  }

  private listenToScroll(): void {
    fromEvent(this.scrollOrigin, 'scroll').subscribe(console.log);
  }

}
