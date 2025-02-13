import { ComponentFactory } from '@angular/core';


export class DialogConfig<T> {
  
  public contentFactory: ComponentFactory<any>;
  public data: T;
  
  constructor(contentFactory: ComponentFactory<any>, data?: any) {
    this.contentFactory = contentFactory;
    this.data = data;
  }

}
