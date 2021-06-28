import {Injectable} from '@angular/core';
import {Actions, ofType, createEffect} from '@ngrx/effects';
import {catchError, exhaustMap, map} from 'rxjs/operators';
import {Router} from '@angular/router';
import {of} from 'rxjs';
import {AuthAction} from '@actions';
import {AuthService} from '@services';
import {ToastrService} from 'ngx-toastr';
import {APP_ROUTES} from "@constants";

@Injectable({providedIn: 'root'})
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
          catchError((err) => {
            if (err === 0) {
              this.alert.error('Revise su conexión y vuelva a intentarlo');
            } else if (err !== 401 && err !== 403) {
              this.alert.error(
                `${action.payload.email}, vuelva a intentarlo. Disculpe las molestias`
              );
            }

            return of(AuthAction.LoginFiled());
          })
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
