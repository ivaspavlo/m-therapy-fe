import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { takeUntil } from 'rxjs/operators';
import { DialogService } from '@app/modules/ui/dialog';
import { DestroySubscriptions } from '@app/shared/classes';
import { AuthRoutingAnimations } from './constants/auth-routing-animations.constant';
import { TestModalComponent } from './components/test-modal/test-modal.component';


@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.scss'],
  animations: [ AuthRoutingAnimations ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthPageComponent extends DestroySubscriptions {

  constructor(
    private dialogService: DialogService,
    private toastrService: ToastrService
  ) {
    super();
  }

  public prepareRoute(outlet: RouterOutlet): boolean {
		return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animationState'];
	}

  public onTestDialog(): void {
    const dialogConfig = {
      test: 'TEST'
    };
    this.dialogService.open(TestModalComponent, dialogConfig).afterClosed.pipe(
      takeUntil(this.componentDestroyed$)
    ).subscribe(() => {
      console.log('works');
    });
  }
}
