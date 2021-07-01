import {
  HttpErrorResponse,
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
        if(err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            this.alert.error('Credenciales incorrectas. No tiene acceso al recurso solicitado');
            this.router.navigate([APP_ROUTES.EMPLOYEES]);
          } else if (err.status === 403) {
            this.alert.error('Su cuenta no se encuentra activada');
          } else if(err.status === 504) {
            this.alert.error('Servicio web no disponible');
          } else if(err.error && err.error.message) {
            this.alert.error(err.error.message);
          } else {
            this.alert.error('Revise su conexión y vuelva a intentarlo');
          }
        }

        return throwError(err.status);
      })
    );
  }
}
