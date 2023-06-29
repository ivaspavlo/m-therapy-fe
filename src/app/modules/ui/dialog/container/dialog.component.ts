import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ComponentRef, ViewChild, ViewContainerRef } from '@angular/core';
import { first } from 'rxjs/operators';
import { DialogConfig } from '../dialog-config';
import { DialogRef } from '../dialog-ref';
import { InsertionDirective } from '../directives/insertion.directive';


@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DialogComponent implements AfterViewInit {
  
  @ViewChild(InsertionDirective, {read: ViewContainerRef}) insertionPoint: ViewContainerRef;
  public componentRef: ComponentRef<any>;
  public isClosing = false;

  constructor(
    private dialogConfig: DialogConfig,
    public dialogRef: DialogRef,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.dialogRef.beforeClosed.pipe(
      first()
    ).subscribe(() => {
      this.isClosing = true;
    });
  }

  ngAfterViewInit() {
    this.loadChildComponent(this.dialogConfig.contentFactory);
    this.cdr.detectChanges();
  }

  public onOverlayClicked(event: MouseEvent): void {
    event.stopPropagation();
    this.dialogRef.close();
  }

  public onDialogClicked(event: MouseEvent): void {
    event.stopPropagation();
  }

  public onAnimationEnd(): void {
    if (this.isClosing) {
      this.clearComponentRef();
    }
  }
  
  private loadChildComponent(factory: any): void {
    this.insertionPoint.clear();
    this.componentRef = this.insertionPoint.createComponent(factory);
  }
  
  private clearComponentRef(): void {
    if (this.componentRef) {
      this.componentRef.destroy();
    }
    this.dialogRef.completeClose();
  }

}
