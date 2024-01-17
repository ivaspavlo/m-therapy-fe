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

  public targetDate!: Date;
  public isLoggedIn: boolean = false;

  constructor(
    private scrollService: ScrollService,
    private userManagementService: UserManagementService
  ) { }

  ngOnInit(): void {
    this.targetDate = this.initTargetDate();
    this.isLoggedIn = this.userManagementService.isLoggedIn();
  }

  public initTargetDate(): Date {
    const targetDate = new Date();
    targetDate.setMonth(targetDate.getMonth() + 1);
    return targetDate;
  }

  public onPricingClick(): void {
    this.scrollService.scrollToElement(ScrollTargetElements.SERVICES_SECTION);
  }
}
