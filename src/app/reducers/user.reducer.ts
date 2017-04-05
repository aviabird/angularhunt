import { Action } from '@ngrx/store';
import { ActionTypes } from '../actions/user.actions';
import { User } from './../models/user';

export type State = {
  isAuthenticated: boolean;
  user: User | null;
  entities: { [id: string]: User };
  ids: string[];
  selectedUserId: string;
  access_token: string;
  upvotedProjectIds: Array<any>;
};

const initialState: State = {
  isAuthenticated: false,
  user: null,
  entities: {},
  ids: [],
  selectedUserId: null,
  access_token: localStorage.getItem('access_token'),
  upvotedProjectIds: []
};


export const userReducer = (state = initialState, action: Action): State => {
  switch (action.type) {
    case ActionTypes.LOGIN_SUCCESS: {
      let user = action.payload;
      let newState = {
        isAuthenticated: true,
        user: user
      };

      return Object.assign({}, state, newState);
    }

    case ActionTypes.LOAD_CURRENT_USER_PROFILE_SUCCESS: {
      let user = action.payload;
      let isAuth = false;

      if (user) {
        isAuth = true;
      }

      let newState = {
        isAuthenticated: isAuth,
        user: user
      };

      return Object.assign({}, state, newState);
    }

    case ActionTypes.LOGOUT_SUCCESS: {
      let newState = {
        isAuthenticated: false,
        user: null,
        access_token: null,
        upvotedProjectIds: []
      };

      return Object.assign({}, state, newState);
    }

    case ActionTypes.LOAD_UPVOTED_PROJECT_IDS_SUCCESS: {
      return Object.assign({},
        state,
        { upvotedProjectIds: action.payload });
    }

    default: {
      return state;
    }
  }
};

export const getIds = (state: State) => state.ids;
export const getEntities = (state: State) => state.entities;
export const getUser = (state: State) => state.user;
export const getUpvotedProjectIds = (state: State) => state.upvotedProjectIds;
