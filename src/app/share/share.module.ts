import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ImageCropperModule } from 'ngx-image-cropper';
import { AngularMaterialModule } from './angular-material.module';
import { CropperDialogComponent } from './components/load-image/cropper-dialog/cropper-dialog.component';
import { LoadImageComponent } from './components/load-image/load-image.component';
import { DefaultImgOnErrorDirective } from './directives/default-img-onerror.directive';


@NgModule({
  declarations: [
    DefaultImgOnErrorDirective,
    LoadImageComponent,
    CropperDialogComponent,
  ],
  imports: [
    CommonModule,
    ImageCropperModule,
    AngularMaterialModule
  ],
  exports: [
    DefaultImgOnErrorDirective,
    LoadImageComponent
  ],
  entryComponents: [CropperDialogComponent],
})
export class ShareModule { }
