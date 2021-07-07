import { AuthAction } from "@actions";
import { Component } from '@angular/core';
import { SafeResourceUrl } from '@angular/platform-browser';
import { APP_ROUTES } from '@constants';
import { Store } from "@ngrx/store";
import { ImageService } from '@share/services/image.service';
import { GlobalState } from "@store";
import { AuthService } from '../../services/auth.service';

@Component({
  selector: "app-header",
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  readonly APP_ROUTES = APP_ROUTES;

  constructor(
    private store: Store<GlobalState>,
    public auth: AuthService,
    private imageService: ImageService
  ) { }

  get photo(): SafeResourceUrl | string {
    return this.imageService.base64ToResourceUrl(this.auth.currentUserValue?.employe?.photo);
  }

  signOut = (): void => {
    this.store.dispatch(AuthAction.LogOutBegin({ accessToken: this.auth.currentUserValue?.accessToken }));
  }
}
