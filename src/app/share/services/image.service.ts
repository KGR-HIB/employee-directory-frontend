import { Injectable } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(private domSanitizer: DomSanitizer) {}

  base64ToResourceUrl(image: string | undefined): SafeResourceUrl | string {
    if (image) {
      return this.domSanitizer.bypassSecurityTrustResourceUrl(`data:image/png;base64,${image}`);
    }
    return 'error_path';
  }
}
