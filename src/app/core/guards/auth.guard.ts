import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { APP_ROUTES } from '@constants';
import { Observable, of } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

  constructor(
    private auth: AuthService,
    private router: Router
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    const currentUser = this.auth.currentUserValue;
    if (!currentUser || !currentUser.accessToken) {
      this.router.navigateByUrl(APP_ROUTES.LOGIN).then();
    }
    return of(true);
  }
}
