import { AuthAction } from '@actions';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { APP_ROUTES } from '@constants';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthService } from '@services';
import { ToastrService } from 'ngx-toastr';
import { of } from 'rxjs';
import { catchError, exhaustMap, map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthEffects {

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthAction.LoginBegin),
      exhaustMap((action) =>
        this.auth.login(action.payload).pipe(
          map((res) => {
            this.alert.success(
              `Bienvenid@ a hiberusTecnología ${action.payload.email}`
            );
            this.router.navigate([APP_ROUTES.EMPLOYEES]);
            return AuthAction.LoginSuccess({
              currentUser: res
            });
          }),
          catchError(() => of(AuthAction.LoginFiled()))
        )
      )
    )
  );

  logOut$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthAction.LogOutBegin),
      exhaustMap((action) =>
        this.auth.logOut().pipe(
          map((logout) => AuthAction.LogOutSuccess()),
          catchError(() => of(AuthAction.LogOutFiled())
          )
        )
      )
    )
  );

  constructor(
    public router: Router,
    private actions$: Actions,
    private auth: AuthService,
    private alert: ToastrService
  ) {
  }
}
