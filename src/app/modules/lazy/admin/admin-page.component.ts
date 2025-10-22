import { ChangeDetectionStrategy, Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { AppRoutingAnimations } from "../auth/constants";

@Component({
  selector: "app-admin-page",
  templateUrl: "./admin-page.component.html",
  styleUrls: ["./admin-page.component.scss"],
  animations: [AppRoutingAnimations],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminPageComponent {
  public prepareRoute(outlet: RouterOutlet): boolean {
    return (
      outlet &&
      outlet.activatedRouteData &&
      outlet.activatedRouteData["animationState"]
    );
  }
}
