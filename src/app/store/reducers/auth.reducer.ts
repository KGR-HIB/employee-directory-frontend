import { AuthAction } from '@actions';
import { CurrentUserDefaultParams, LoginDefaultParams } from '@constants';
import { User } from '@models';
import { Action, createReducer, on } from '@ngrx/store';
import { LoginState } from '@store';

const currentUser = JSON.parse(String(localStorage.getItem('currentUser')));

let initState: LoginState = LoginDefaultParams;

if (currentUser) {
  initState = {
    loggedIn: true,
    isLoading: false,
    error: false,
    currentUser: { ...currentUser }
  };
}

const reducer = createReducer(
  initState,
  on(AuthAction.LoginBegin, AuthAction.LogOutBegin, (state) => ({
    ...state,
    loggedIn: false,
    isLoading: true,
    error: false,
  })),
  on(AuthAction.LoginSuccess, (state, user) => ({
    ...state,
    isLoading: false,
    error: false,
    loggedIn: true,
    currentUser: addUser(user.currentUser)
  })),
  on(AuthAction.LoginFiled, (state) => ({
    ...state,
    isLoading: false,
    error: true,
    loggedIn: false,
    currentUser: removeUser()
  })),
  on(AuthAction.LogOutSuccess, (state) => ({
    ...state,
    currentUser: removeUser(),
    error: false,
    isLoading: false,
    loggedIn: false,
  })),
  on(AuthAction.LogOutFiled, (state) => ({
    ...state,
    error: true,
    isLoading: false,
    loggedIn: true,
  }))
);

export function authenticationReducer(
  state: LoginState | undefined,
  action: Action
) {
  return reducer(state, action);
}

function addUser(u: User) {
  localStorage.setItem('currentUser', JSON.stringify(u));
  return u;
}

function removeUser() {
  localStorage.removeItem('currentUser');
  return CurrentUserDefaultParams;
}
