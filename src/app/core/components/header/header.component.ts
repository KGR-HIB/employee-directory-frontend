import { AuthAction } from "@actions";
import { Component } from '@angular/core';
import { SafeResourceUrl } from '@angular/platform-browser';
import { APP_ROUTES } from '@constants';
import { Store } from "@ngrx/store";
import { GlobalState } from "@store";
import { User } from '../../models/user.model';
import { AuthService } from '../../services/auth.service';
import { ImageService } from '@share/services/image.service';

@Component({
  selector: "app-header",
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  isAdmin!: boolean;
  user!: User | null;

  readonly APP_ROUTES = APP_ROUTES;

  constructor(
    private store: Store<GlobalState>,
    private auth: AuthService,
    private imageService: ImageService
  ) {
    this.isAdmin = this.auth.isAdmin();
    this.user = this.auth.currentUserValue;
  }

  get photo(): SafeResourceUrl | string {
    if (this.user?.employe) {
      return this.imageService.base64ToResourceUrl(this.user.employe.photo);
    }
    return 'no_photo';
  }

  signOut = (): void => {
    this.store.dispatch(AuthAction.LogOutBegin({ accessToken: this.user?.accessToken }));
  }
}
