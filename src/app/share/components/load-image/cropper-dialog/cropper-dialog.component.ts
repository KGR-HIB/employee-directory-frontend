import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ImageCroppedEvent, ImageTransform } from 'ngx-image-cropper';

const IMAGE_NAME = 'logo.png';
const CONTENT_TYPE_PNG = 'image/png';

@Component({
  selector: 'app-cropper-dialog',
  templateUrl: './cropper-dialog.component.html',
  styleUrls: ['./cropper-dialog.component.scss']
})
export class CropperDialogComponent implements OnInit {

  image: any;
  scale = 1;
  fileData!: File;
  previewUrl: any = null;
  fileUploadProgress!: string;
  croppedImage: any = '';
  imageChangedEvent: any;
  transform: ImageTransform = {};

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CropperDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.imageChangedEvent = data.image;
  }

  ngOnInit() {
  }

  async save() {
    await this.base64ToFile();
    this.image = this.croppedImage;
    if (this.fileData && this.fileData.size > 0) {
      this.dialogRef.close({image: this.image, fileData: this.fileData});
    }
  }

  close() {
    this.dialogRef.close();
  }

  private async base64ToFile() {
    await fetch(this.croppedImage)
      .then(res => res.blob())
      .then(blob => {
        this.fileData = new File([blob], IMAGE_NAME, { type: CONTENT_TYPE_PNG });
      });
  }

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
  }

  zoomOut() {
    this.scale -= .1;
    this.transform = {
      ...this.transform,
      scale: this.scale
    };
  }

  zoomIn() {
    this.scale += .1;
    this.transform = {
      ...this.transform,
      scale: this.scale
    };
  }

}
