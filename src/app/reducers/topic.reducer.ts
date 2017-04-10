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

    case ActionTypes.LOAD_TOPICS_SUCCESS: {
      const Topics: Topic[] = action.payload;

      const newTopics: Topic[] = Topics;

      const newTopicsIds = Topics
        .filter(list => !state.entities[list.id])
        .map(list => list.id);

      const newEntities = newTopics
        .reduce((entities: { [id: string]: Topic }, Topic: Topic) => {
          return Object.assign(entities, {
            [Topic.id]: Topic
          });
        }, {});

      return Object.assign({}, state, {
        ids: [...state.ids, ...newTopicsIds],
        entities: Object.assign({}, state.entities, newEntities)
      });
    }
    /* falls through */
    default: {
      return state;
    }
  }
};

export const getIds = (state: State) => state.ids;
export const getEntities = (state: State) => state.entities;
