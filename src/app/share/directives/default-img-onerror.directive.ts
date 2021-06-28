import { Directive, Input } from '@angular/core';

const PATH = '../../assets/media/user/user.png';

@Directive({
  selector: 'img[appDefImg]',
  host: {
    '(error)': 'setDefaultImg()',
    '[src]': 'src'
  }
})
export class DefaultImgOnErrorDirective {

  @Input() src!: string;
  @Input() appDefImg!: string;

  setDefaultImg() {
    this.src = PATH;
  }
}
