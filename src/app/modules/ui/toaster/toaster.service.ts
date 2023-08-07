import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ToastType } from './toaster.interface';


@Injectable()
export class ToasterService {

  constructor(
    private toastrService: ToastrService
  ) { }

  public show(message: string, type: ToastType = ToastType.INFO): void {
    switch (type) {
      case ToastType.SUCCESS: {
        this.toastrService.success(message);
        return;
      };
      case ToastType.ERROR: {
        this.toastrService.error(message);
        return;
      }
      case ToastType.INFO: {
        this.toastrService.info(message);
        return;
      }
    }
  }
}
