import { Topic } from './../models/topic';
import { Action } from '@ngrx/store';
import { ActionTypes } from '../actions/topic.actions';

export type State = {
  entities: { [id: string]: Topic };
  ids: string[];
  selectedTopicId: string;
};

const initialState: State = {
  entities: {},
  ids: [],
  selectedTopicId: null,
};


export const topicReducer = (state = initialState, action: Action): State => {
  switch (action.type) {
    default: {
      return state;
    }
  }
};

export const getIds = (state: State) => state.ids;
export const getEntities = (state: State) => state.entities;
