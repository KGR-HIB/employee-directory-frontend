import {
  ActionReducer} from '@ngrx/store';
import { environment } from '../../../environments/environment';
import {GlobalState} from '@store';
import {authenticationReducer} from './auth.reducer';
import { storeLogger } from 'ngrx-store-logger';

export const reducers = {
  authentication: authenticationReducer
};

export function logger(reducer: ActionReducer<GlobalState>): ActionReducer<GlobalState> {
  // default, no options
  return storeLogger()(reducer);
}
export const metaReducers = environment.production ? [] : [logger];
// export const metaReducers = [logger];

