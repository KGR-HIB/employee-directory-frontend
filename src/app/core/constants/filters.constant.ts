import { User } from '@models';
import { LoginState } from '@store';

export const LoginDefaultParams: LoginState = {
  loggedIn: false,
  isLoading: false,
  error: false,
  currentUser: null
};

export const CurrentUserDefaultParams: User = {
  id: 0,
  email: '',
  password: '',
  tokenType: '',
  accessToken: '',
  loginFirstTime: false,
  role: undefined
};
