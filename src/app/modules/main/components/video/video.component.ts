import { Component, ChangeDetectionStrategy, AfterViewInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VideoComponent implements AfterViewInit {

  // @ViewChild('videoElem') public videoElem: ElementRef;

  constructor() { }

  ngAfterViewInit(): void {
    // this.videoElem.nativeElement.play();
  }

}
