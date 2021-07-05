export interface GlobalState {
  authentication: LoginState;
}

export interface LoginState {
  loggedIn: boolean;
  isLoading: boolean;
  error: boolean;
  currentUser: any;
}

