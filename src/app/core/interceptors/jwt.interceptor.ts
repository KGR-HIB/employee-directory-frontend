import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {AuthService} from '@services';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private auth: AuthService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    const currentUser = this.auth.currentUserValue;

    let headers: AppHeaders = {}

    if (currentUser && currentUser.token) {
      headers = { ...headers, Authorization: `Bearer ${currentUser.token}` };
    }

    const responseType = request.responseType;
    const isFormData = request.body instanceof FormData;
    // When is blob, header is by form-data raw
    if (isFormData || responseType === 'blob') {
      return next.handle(request);
    } else {
      return next.handle(
        request.clone({
          setHeaders: { ...headers, 'Content-Type': 'application/json' },
        })
      );
    }
  }
}

export interface AppHeaders {
  'x-access-token'?: string;
  'Content-Type'?: string;
  Authorization?: string;
}
