import { ChangeDetectionStrategy, Component } from '@angular/core';


@Component({
  selector: 'app-header-mobile-menu',
  templateUrl: './header-mobile-menu.component.html',
  styleUrls: ['./header-mobile-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderMobileMenuComponent {

  ngOnInit(): void {
    
  }

  private listenToArrowKeysClick(): void {
    
  }

}
