import {
  HttpEvent, HttpHandler, HttpInterceptor, HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { APP_ROUTES } from "@constants";
// import {AuthService} from '@services';
import { ToastrService } from 'ngx-toastr';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    // private auth: AuthService,
    private alert: ToastrService,
    public router: Router
  ) {
  }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((err) => {

        switch (err.status) {
          case 401:
            this.alert.error('Credenciales incorrectas');
            this.router.navigate([APP_ROUTES.EMPLOYEES]);
            break;

          case 403:
            this.alert.error('Su cuenta no se encuentra activada');
            break;

          case 500:
            this.alert.error('En estos momentos presentamos problemas para mostrar la información de la página.');
            break;

          default:
            this.alert.error('Revise su conexión y vuelva a intentarlo');
            break;
        }

        return throwError(err.status);
      })
    );
  }
}
