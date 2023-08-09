import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { ScrollTargetElements } from '../constants';


@Injectable({
  providedIn: 'root'
})
export class ScrollService {

  constructor(
    @Inject(DOCUMENT) private document: Document
  ) { }

  public scrollToElement(elementId: ScrollTargetElements): void {
    const targetElement = this.document.getElementById(elementId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  }

}
