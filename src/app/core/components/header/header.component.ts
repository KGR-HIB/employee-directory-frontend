import { AuthAction } from "@actions";
import { Component } from '@angular/core';
import { APP_ROUTES } from '@constants';
import { Store } from "@ngrx/store";
import { GlobalState } from "@store";
import { User } from '../../models/user.model';
import { AuthService } from '../../services/auth.service';

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
    private auth: AuthService
  ) {
    this.isAdmin = this.auth.isAdmin();
    this.user = this.auth.currentUserValue;
  }

  signOut = (): void => {
    this.store.dispatch(AuthAction.LogOutBegin({ accessToken: this.user?.accessToken }));
  }
}
