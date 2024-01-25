import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { ScrollTargetElements } from '@app/core/constants';
import { UserManagementService, ScrollService } from '@app/core/services';
import { AdType, IAd } from '@app/interfaces';


@Component({
  selector: 'app-landing-section',
  templateUrl: './landing-section.component.html',
  styleUrls: ['./landing-section.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LandingSectionComponent implements OnInit {
  @Input() set ads(value: IAd[] | null) {
    if (!Array.isArray(value)) {
      return;
    }
    this.ad = value.find(ad => ad.type === AdType.COUNTDOWN);
  };
  public ad?: IAd;
  public isLoggedIn: boolean = false;

  constructor(
    private scrollService: ScrollService,
    private userManagementService: UserManagementService
  ) { }

  ngOnInit(): void {
    this.isLoggedIn = this.userManagementService.isLoggedIn();
  }

  public onPricingClick(): void {
    this.scrollService.scrollToElement(ScrollTargetElements.SERVICES_SECTION);
  }
}
