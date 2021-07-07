import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { ImageCropperModule } from 'ngx-image-cropper';
import { AngularMaterialModule } from './angular-material.module';
import { CropperDialogComponent } from './components/load-image/cropper-dialog/cropper-dialog.component';
import { LoadImageComponent } from './components/load-image/load-image.component';
import { PaginatorComponent } from './components/paginator/paginator.component';
import { DefaultImgOnErrorDirective } from './directives/default-img-onerror.directive';
import { PhoneCharsDirective } from './directives/phone-chars.directive';
import { ImageService } from './services/image.service';

@NgModule({
  declarations: [
    DefaultImgOnErrorDirective,
    LoadImageComponent,
    CropperDialogComponent,
    PaginatorComponent,
    PhoneCharsDirective
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ImageCropperModule,
    AngularMaterialModule,
    FormsModule,
    PaginationModule.forRoot()
  ],
  exports: [
    DefaultImgOnErrorDirective,
    PhoneCharsDirective,
    LoadImageComponent,
    PaginatorComponent
  ],
  entryComponents: [CropperDialogComponent],
  providers: [
    ImageService
  ]
})
export class ShareModule { }
