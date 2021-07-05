import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URLS } from '@constants';
import { Authentication, Response, User } from '@models';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(String(localStorage.getItem('currentUser')))
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(payload: Authentication): Observable<User> {
    return this.http.post<Response<User>>(API_URLS.LOGIN, payload).pipe(
      map((response) => response.data)
    );
  }

  logOut(): Observable<Response<any>> {
    return this.http.post<Response<any>>(`${API_URLS.LOGOUT}`, {});
  }

}
