import {
  HttpEvent, HttpHandler, HttpInterceptor, HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '@services';
import { Observable } from 'rxjs';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private auth: AuthService) { }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    const currentUser = this.auth.currentUserValue;

    let headers: AppHeaders = {}

    if (currentUser && currentUser.accessToken) {
      headers = { ...headers, Authorization: `Bearer ${currentUser.accessToken}` };
    }

    const responseType = request.responseType;
    const isFormData = request.body instanceof FormData;
    // When is blob, header is by form-data raw
    if (isFormData || responseType === 'blob') {
      return next.handle(request);
    } else {
      return next.handle(
        request.clone({
          setHeaders: { ...headers },
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
