import { AuthAction } from "@actions";
import { Component } from '@angular/core';
import { APP_ROUTES, CONSTANTS } from '@constants';
import { User } from "@models";
import { Store } from "@ngrx/store";
import { GlobalState } from "@store";
import { Observable } from "rxjs";

@Component({
  selector: "app-header",
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  user$: Observable<User | null>;
  user!: User | null;
  isAdmin!: boolean;

  readonly APP_ROUTES = APP_ROUTES;

  constructor(
    private store: Store<GlobalState>,
  ) {
    this.user$ = this.store.select((store) => store.authentication.currentUser);
    this.user$.subscribe(currentUser => this.user = currentUser);
    if (this.user && this.user.role?.code === CONSTANTS.ROLES.ADMIN) {
      this.isAdmin = true;
    }
  }

  signOut = (): void => {
    this.store.dispatch(AuthAction.LogOutBegin({ accessToken: this.user?.accessToken }));
  }
}
