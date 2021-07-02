import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL, REST_CONTROLLER } from '@constants';
import { Authentication, User } from '@models';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpBaseService } from './http-base.service';

@Injectable({ providedIn: 'root' })
export class AuthService extends HttpBaseService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(http: HttpClient) {
    super(http, `${API_URL}${REST_CONTROLLER.LOGIN}`);
    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(String(localStorage.getItem('currentUser')))
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(payload: Authentication): Observable<User> {
    return this.post('/', payload).pipe(
      map((response) => response.data)
    );
  }

}
