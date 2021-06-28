import * as appModels from '@models';

export interface GlobalState {
  authentication: LoginState;
  // employees: EmployeesState;
}

export interface LoginState {
  loggedIn: boolean;
  isLoading: boolean;
  error: boolean;
  currentUser: appModels.User | null;
}

