import { User } from '@models';
import { LoginState } from '@store';

export const LoginDefaultParams: LoginState = {
  loggedIn: false,
  isLoading: false,
  error: false,
  currentUser: null
};

export const CurrentUserDefaultParams: User = {
  userId: 0,
  mail: '',
  password: '',
  token: '',
  hasInitSession: false,
  role: undefined
};
