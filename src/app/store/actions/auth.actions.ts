import { Authentication, User } from '@models';
import { createAction, props } from '@ngrx/store';

export const LoginBegin = createAction(
  '[AUTHENTICATION] Login Begin',
  props<{ payload: Authentication }>()
);
export const LoginSuccess = createAction(
  '[AUTHENTICATION] Login Success',
  props<{ currentUser: User }>()
);
export const LoginFiled = createAction(
  '[AUTHENTICATION] Login Filed'
);

export const LogOutBegin = createAction(
  '[AUTHENTICATION] LogOut Begin',
  props<{ tokenId: User['token'] }>()
);
export const LogOutSuccess = createAction(
  '[AUTHENTICATION] LogOut Success'
);
export const LogOutFiled = createAction(
  '[AUTHENTICATION] LogOut Filed'
);
