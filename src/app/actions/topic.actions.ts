import { Topic } from './../models/topic';
import { type } from '../util';
import { Action } from '@ngrx/store';

export const ActionTypes = {
  LOAD_TOPICS:          type('Load Topics'),
  LOAD_TOPICS_SUCCESS:  type('Load Topics Success'),
};

export class TopicActions {

  loadTopics(): Action {
    return {
      type: ActionTypes.LOAD_TOPICS
    };
  }

  loadTopicsSuccess(response: Topic[]): Action {
    return {
      type: ActionTypes.LOAD_TOPICS_SUCCESS,
      payload: response
    };
  }
}
