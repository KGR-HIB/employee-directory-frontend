import { Directive, Input } from '@angular/core';
import { SafeResourceUrl } from '@angular/platform-browser';

const PATH = '../../assets/media/user/user.png';

@Directive({
  selector: 'img[appDefImg]',
  host: {
    '(error)': 'setDefaultImg()',
    '[src]': 'src'
  }
})
export class DefaultImgOnErrorDirective {

  @Input() src!: SafeResourceUrl | string;
  @Input() appDefImg!: string;

  setDefaultImg() {
    this.src = PATH;
  }
}
