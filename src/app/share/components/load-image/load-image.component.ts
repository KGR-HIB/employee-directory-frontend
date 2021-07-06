import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { CropperDialogComponent } from './cropper-dialog/cropper-dialog.component';

const PROFILE_IMAGE_LOGO = '../../assets/media/user/user.png';

@Component({
  selector: 'app-load-image',
  templateUrl: './load-image.component.html',
  styleUrls: ['./load-image.component.scss']
})
export class LoadImageComponent implements OnInit, OnChanges {

  @Input() currentImage!: string;
  @Input() refresh!: number;
  @Output() loadedFileImage: EventEmitter<File>;

  image: any;
  fileData!: File;
  previewUrl: any = null;
  fileUploadProgress!: string;
  croppedImage: any = '';
  imageChangedEvent: any;
  cropperImageModal: any;

  constructor(private dialog: MatDialog) {
    this.loadedFileImage = new EventEmitter();
  }

  ngOnInit() {
    if (this.currentImage) {
      this.image = this.currentImage;
    } else {
      this.image = PROFILE_IMAGE_LOGO;
    }
  }

  ngOnChanges() {
    if (this.refresh) {
      if (this.currentImage) {
        this.image = this.currentImage;
      } else {
        this.image = PROFILE_IMAGE_LOGO;
      }
    }
  }

  getImagePrev() {
    return `url("${this.image}")`;
  }

  fileProgress(event: any) {
    console.log(event);
    this.fileData = event.target.files[0];
    this.imageChangedEvent = event;
    this.openCropperModal();
    this.preview();
  }

  openCropperModal() {
    if (this.fileData) {
      this.openDialog().subscribe(
        data => {
          console.log(data);
          this.image = data.image;
          this.fileData = data.fileData;
          this.loadedFileImage.emit(this.fileData);
        }
      );
    }
  }

  private preview() {
    console.log('this.fileData', this.fileData);
    const mimeType = this.fileData.type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(this.fileData);
    reader.onload = (_event) => {
      this.image = reader.result;
    };
  }  

  private openDialog(): Observable<any> {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.maxWidth = '600px'
    dialogConfig.data = {
      image: this.imageChangedEvent
    };
    const dialogRef = this.dialog.open(CropperDialogComponent, dialogConfig);
    return dialogRef.afterClosed();
  }

}
