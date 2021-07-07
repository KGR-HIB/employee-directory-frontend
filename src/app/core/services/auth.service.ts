import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URLS } from '@constants';
import { Authentication, Response, User } from '@models';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CONSTANTS } from '../constants/common.constant';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser: Observable<User | null>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User | null>(
      JSON.parse(String(localStorage.getItem('currentUser')))
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  updateCurrentUserValue(value: any) {
    console.log('@@@@@@@updateCurrentUserValue ', value);
    localStorage.setItem('currentUser', JSON.stringify(value));
    this.currentUserSubject.next(value);
  }

  isAdmin(): boolean {
    const currentUser = this.currentUserValue;
    if (currentUser && currentUser.role?.code === CONSTANTS.ROLES.ADMIN) {
      return true;
    }
    return false;
  }

  login(payload: Authentication): Observable<User> {
    return this.http.post<Response<User>>(API_URLS.LOGIN, payload).pipe(
      map((response) => {
        this.updateCurrentUserValue(response.data);
        return response.data;
      })
    );
  }

  logOut(): Observable<Response<any>> {
    return this.http.post<Response<any>>(`${API_URLS.LOGOUT}`, {}).pipe(
      map((response) => {
        this.updateCurrentUserValue(null);
        return response;
      })
    );
  }

}
