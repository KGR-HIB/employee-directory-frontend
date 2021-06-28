import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Authentication, User } from '@models';
import { BehaviorSubject, Observable, of } from 'rxjs';

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
    return of({
        userId: 1,
        mail: 'ocastro@gmail.com',
        password: '',
        token: 'token',
        hasInitSession: true,
        role: {
          roleId: 1,
          code: 'admin',
          name: 'Admin',
          funtionalities: undefined
        }
      });
    // return this.http.post<User>(
    //   `${environment.apiUrl}/login`, payload
    // );
  }

}
