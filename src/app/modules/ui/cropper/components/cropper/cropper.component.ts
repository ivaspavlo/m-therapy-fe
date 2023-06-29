import { Component, ChangeDetectionStrategy, ViewChild, Output, EventEmitter } from '@angular/core';
import { ImageCropperComponent, ImageCroppedEvent } from 'ngx-image-cropper';
import { ISaveCroppedImageEvent } from '../../interfaces';


@Component({
  selector: 'app-cropper',
  templateUrl: './cropper.component.html',
  styleUrls: ['./cropper.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CropperComponent {

  @ViewChild(ImageCropperComponent) imageCropper: ImageCropperComponent;
  @Output() saveCroppedImage: EventEmitter<ISaveCroppedImageEvent> = new EventEmitter();

  public imageChangedEvent: Event;
  public croppedImage: string | null | undefined;

  public onChange(event: Event): void {
    this.imageChangedEvent = event;
  }

  public imageCropped(event: ImageCroppedEvent): void {
    this.croppedImage = event.base64;
  }

  public crop(): void {
    this.imageCropper.crop();
  }

  public onSave(): void {
    if (typeof this.croppedImage === 'string') {
      const imgBlob = this.dataURIToBlob(this.croppedImage);
      this.saveCroppedImage.emit({
        imgBase64: this.croppedImage,
        imgBlob
      });
    }
  }

  private dataURIToBlob(dataURI: string): Blob {
    const splitDataURI = dataURI.split(',');
    const byteString = splitDataURI[0].indexOf('base64') >= 0 ?
      atob(splitDataURI[1]) :
      decodeURI(splitDataURI[1]);

    const mimeString = splitDataURI[0].split(':')[1].split(';')[0];

    const ia = new Uint8Array(byteString.length)
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }

    return new Blob([ia], { type: mimeString });
  }

}
