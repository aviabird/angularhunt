import { Action } from '@ngrx/store';
import { ActionTypes } from '../actions/user.actions';
import { User } from './../models/user';

export type State = {
  isAuthenticated: boolean;
  user: User | null;
  entities: {[id: string]: User};
  ids: string[];
  selectedUserId: string;
  access_token: string;
}

const initialState: State = {
  isAuthenticated: false,
  user: null,
  entities: {},
  ids: [],
  selectedUserId: null,
  access_token: localStorage.getItem('access_token')
}

export default function (state = initialState, action: Action): State {
  switch (action.type) {    
    case ActionTypes.LOGIN_SUCCESS: {
      let user = action.payload;

      let newState = {
        isAuthenticated: true,
        user: user,
        access_token: localStorage.getItem('access_token')
      };

      return Object.assign({}, state, newState);
    }

    case ActionTypes.LOAD_CURRENT_USER_PROFILE_SUCCESS: {
      let user = action.payload
      let isAuth = false
      
      if(user){
        isAuth = true
      }

      let newState = {
        isAuthenticated: isAuth,
        user: user
      }

      return Object.assign({}, state, newState);
    }

    case ActionTypes.LOGOUT_SUCCESS: {
      let newState = {
        isAuthenticated: false,
        user: null,
        access_token: null
      }

      return Object.assign({}, state, newState);
    }
    
    default: {
      return state;
    }
  }
}

export const getIds = (state: State) => state.ids;
export const getEntities = (state: State) => state.entities
export const getUser = (state: State) => state.user