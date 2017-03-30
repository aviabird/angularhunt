import { type } from '../util';
import { Action } from '@ngrx/store';
import { User } from '../models';

export const ActionTypes = {
  LOGIN:          type('Login'),
  LOGIN_SUCCESS:  type('Login Success'),
  LOGOUT:         type('Logout'),
  LOGOUT_SUCCESS: type('Logout Success'),
  LOAD_CURRENT_USER_PROFILE: type('Load Current User Profile'),
  LOAD_CURRENT_USER_PROFILE_SUCCESS: type('Load Current User Profile Success')
}

export class UserActions {

  login(provider: string): Action {
    return {
      type: ActionTypes.LOGIN,
      payload: provider
    };
  }

  // TODO: response should be user
  loginSuccess(response: any): Action {
    return {
      type: ActionTypes.LOGIN_SUCCESS,
      payload: response
    };
  }

  logout(): Action {
    return {
      type: ActionTypes.LOGOUT
    };
  }

  logoutSuccess(): Action {
    return {
      type: ActionTypes.LOGOUT_SUCCESS
    }
  }

  loadCurrentUserProfile(): Action {
    return {
      type: ActionTypes.LOAD_CURRENT_USER_PROFILE
    };
  }

  loadCurrentUserProfileSuccess(user: User): Action {
    return {
      type: ActionTypes.LOAD_CURRENT_USER_PROFILE_SUCCESS,
      payload: user
    };
  }
};
