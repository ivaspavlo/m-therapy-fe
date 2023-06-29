import { Observable, Subject } from 'rxjs';


export class DialogRef {
  
  private readonly _beforeClosed = new Subject<any>();
  private readonly _afterClosed = new Subject<any>();
  public beforeClosed: Observable<any> = this._beforeClosed.asObservable();
  public afterClosed: Observable<any> = this._afterClosed.asObservable();

  private result: any;
  
  constructor() { }

  public close(result?: any): void {
    this.result = result;
    this._beforeClosed.next();
  }

  public completeClose(): void {
    this._afterClosed.next(this.result);
  }

}
