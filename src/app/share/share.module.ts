import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { ImageCropperModule } from 'ngx-image-cropper';
import { AngularMaterialModule } from './angular-material.module';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { CropperDialogComponent } from './components/load-image/cropper-dialog/cropper-dialog.component';
import { PaginatorComponent } from './components/paginator/paginator.component';
import { LoadImageComponent } from './components/load-image/load-image.component';
import { DefaultImgOnErrorDirective } from './directives/default-img-onerror.directive';
import { ImageService } from './services/image.service';

@NgModule({
  declarations: [
    DefaultImgOnErrorDirective,
    LoadImageComponent,
    CropperDialogComponent,
    PaginatorComponent
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
    LoadImageComponent,
    PaginatorComponent
  ],
  entryComponents: [CropperDialogComponent],
  providers: [
    ImageService
  ]
})
export class ShareModule { }
