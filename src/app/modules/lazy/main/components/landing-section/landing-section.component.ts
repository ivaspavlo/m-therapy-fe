import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ScrollTargetElements } from '@app/core/constants';
import { UserManagementService } from '@app/core/services';
import { ScrollService } from '@app/core/services/scroll.service';


@Component({
  selector: 'app-landing-section',
  templateUrl: './landing-section.component.html',
  styleUrls: ['./landing-section.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LandingSectionComponent implements OnInit {
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
