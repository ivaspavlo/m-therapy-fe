import { AfterContentInit, ChangeDetectionStrategy, Component, ContentChildren, ElementRef, QueryList } from '@angular/core';


@Component({
  selector: 'app-header-mobile-menu',
  templateUrl: './header-mobile-menu.component.html',
  styleUrls: ['./header-mobile-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderMobileMenuComponent implements AfterContentInit {

  @ContentChildren('headerMobileMenuItem', {descendants: true}) details!: QueryList<ElementRef>;
  private items: HTMLElement[] = [];

  ngAfterContentInit(): void {
    this.items = this.details.toArray().map(e => e.nativeElement);
  }

  private listenToArrowKeysClick(): void {
    
  }

}
