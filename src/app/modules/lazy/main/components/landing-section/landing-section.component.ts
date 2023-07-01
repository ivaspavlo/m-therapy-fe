import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';


@Component({
  selector: 'app-landing-section',
  templateUrl: './landing-section.component.html',
  styleUrls: ['./landing-section.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LandingSectionComponent implements OnInit {

  public targetDate!: Date;

  constructor() { }

  ngOnInit(): void {
    this.targetDate = this.initTargetDate();
  }

  public initTargetDate(): Date {
    const targetDate = new Date();
    targetDate.setMonth(targetDate.getMonth() + 1);
    return targetDate;
  }

}
