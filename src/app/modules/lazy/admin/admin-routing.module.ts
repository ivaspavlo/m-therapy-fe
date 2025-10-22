import { NgModule } from "@angular/core";
import { Route, RouterModule } from "@angular/router";
import { AdminPageComponent } from "./admin-page.component";
import { AdminConfirmOrderComponent } from "./components/admin-confirm-order/admin-confirm-order.component";

export enum ADMIN_ROUTE_NAME {
  CONFIRM_ORDER = "confirm-order/:token",
}

const mainRouts: Route[] = [
  {
    path: "",
    pathMatch: "full",
    component: AdminPageComponent,
    children: [
      {
        path: ADMIN_ROUTE_NAME.CONFIRM_ORDER,
        component: AdminConfirmOrderComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(mainRouts)],
})
export class AdminRoutingModule {}
