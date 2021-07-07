const IMAGE_NAME = 'logo.png';
const CONTENT_TYPE_PNG = 'image/png';

export class ImageUtil {
  static base64ToFile(image: any): Promise<File> {
    return new Promise((resolve) => {
      fetch(image)
      .then(res => res.blob())
      .then(blob => {
         resolve(new File([blob], IMAGE_NAME, { type: CONTENT_TYPE_PNG }));
      });
    });
  }
}
