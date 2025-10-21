import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";

import { SIGNED_TOKEN } from "@app/core/constants";
import { ToasterService } from "@app/core/services";

@Component({
  selector: "app-admin-confirm-order",
  templateUrl: "./admin-confirm-order.component.html",
  styleUrls: ["./admin-confirm-order.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminConfirmOrderComponent implements OnInit {
  private token: string | null = null;
  private messages = {
    failure: "main.unsubscribe.failure-reason",
  };

  constructor(
    private route: ActivatedRoute,
    private toasterService: ToasterService,
    private translateService: TranslateService
  ) {}

  ngOnInit(): void {
    this.token = this.route.snapshot.params[SIGNED_TOKEN];
  }
}
